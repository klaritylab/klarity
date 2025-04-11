import React, { useState } from 'react';
import PDFSearch from '@/components/PDFSearch';
import PDFList from '@/components/PDFList';
import PDFUploader from '@/components/PDFUploader';
import { usePDFContext } from '@/context/PDFContext';

const PDFsPage = () => {
  const { pdfs } = usePDFContext();
  const [filteredPDFs, setFilteredPDFs] = useState(pdfs);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPDFs(pdfs);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = pdfs.filter((pdf) =>
      pdf.name.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredPDFs(filtered);
  };

  // Update filtered PDFs when pdfs change
  React.useEffect(() => {
    setFilteredPDFs(pdfs);
  }, [pdfs]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My PDFs</h1>
          <p className="text-gray-600">
            Browse all PDFs you have uploaded. You can search for a specific file or upload a new one.
          </p>
        </div>
        <PDFUploader />
      </div>

      <div className="mb-8">
        <PDFSearch onSearch={handleSearch} />
      </div>

      <PDFList />
    </div>
  );
};

export default PDFsPage;
