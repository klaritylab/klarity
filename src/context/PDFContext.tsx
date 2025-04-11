import React, { createContext, useContext, useState } from 'react';

interface PDFContextType {
  currentPDF: {
    url: string;
    name: string;
  } | null;
  setCurrentPDF: (pdf: { url: string; name: string } | null) => void;
}

const PDFContext = createContext<PDFContextType>({
  currentPDF: null,
  setCurrentPDF: () => {},
});

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPDF, setCurrentPDF] = useState<{ url: string; name: string } | null>(null);

  return (
    <PDFContext.Provider value={{ currentPDF, setCurrentPDF }}>
      {children}
    </PDFContext.Provider>
  );
};

export const usePDFContext = () => useContext(PDFContext);
