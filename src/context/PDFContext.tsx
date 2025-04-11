import React, { createContext, useContext, useState } from 'react';

interface PDF {
  id: string;
  url: string;
  name: string;
  uploadDate: Date;
}

interface PDFContextType {
  currentPDF: PDF | null;
  pdfs: PDF[];
  setCurrentPDF: (pdf: PDF | null) => void;
  deletePDF: (id: string) => void;
}

const PDFContext = createContext<PDFContextType>({
  currentPDF: null,
  pdfs: [],
  setCurrentPDF: () => {},
  deletePDF: () => {},
});

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPDF, setCurrentPDF] = useState<PDF | null>(null);
  const [pdfs, setPdfs] = useState<PDF[]>([]);

  const deletePDF = (id: string) => {
    setPdfs(prev => prev.filter(pdf => pdf.id !== id));
    if (currentPDF?.id === id) {
      setCurrentPDF(null);
    }
  };

  return (
    <PDFContext.Provider value={{ currentPDF, pdfs, setCurrentPDF, deletePDF }}>
      {children}
    </PDFContext.Provider>
  );
};

export const usePDFContext = () => useContext(PDFContext);
