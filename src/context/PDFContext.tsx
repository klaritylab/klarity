import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PDF = {
  id: string;
  name: string;
  url: string;
  uploadDate: Date;
  size?: number; // Size in KB
};

export type ChatMessage = {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  avatar?: string;
};

type PDFContextType = {
  pdfs: PDF[];
  addPDF: (file: File) => Promise<void>;
  deletePDF: (id: string) => void;
  currentPDF: PDF | null;
  setCurrentPDF: (pdf: PDF | null) => void;
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  isUploading: boolean;
};

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const usePDFContext = () => {
  const context = useContext(PDFContext);
  if (!context) {
    throw new Error('usePDFContext must be used within a PDFProvider');
  }
  return context;
};

export const PDFProvider = ({ children }: { children: ReactNode }) => {
  const [pdfs, setPDFs] = useState<PDF[]>([]);
  const [currentPDF, setCurrentPDF] = useState<PDF | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addPDF = async (file: File) => {
    setIsUploading(true);
    try {
      // In a real app, you'd upload the file to a server
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      const sizeInKB = Math.round(file.size / 1024);
      
      const newPDF: PDF = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        url,
        uploadDate: new Date(),
        size: sizeInKB,
      };
      
      setPDFs([...pdfs, newPDF]);
      
      // Auto-select the newly uploaded PDF
      setCurrentPDF(newPDF);
      
      // Clear messages when a new PDF is selected
      setMessages([]);
      
    } catch (error) {
      console.error('Error uploading PDF:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const deletePDF = (id: string) => {
    const pdfToDelete = pdfs.find(pdf => pdf.id === id);
    if (pdfToDelete) {
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(pdfToDelete.url);
      
      // Remove the PDF from the list
      setPDFs(pdfs.filter(pdf => pdf.id !== id));
      
      // Clear the current PDF if it's the one being deleted
      if (currentPDF?.id === id) {
        setCurrentPDF(null);
        setMessages([]);
      }
    }
  };

  const addMessage = (messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
      ...messageData,
    };
    setMessages([...messages, newMessage]);
  };
  
  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <PDFContext.Provider
      value={{
        pdfs,
        addPDF,
        deletePDF,
        currentPDF,
        setCurrentPDF,
        messages,
        addMessage,
        clearMessages,
        isUploading,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};
