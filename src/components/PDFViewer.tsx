import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { usePDFContext } from '../context/PDFContext';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = () => {
  const { currentPDF } = usePDFContext();
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return newPageNumber > 0 && numPages && newPageNumber <= numPages 
        ? newPageNumber 
        : prevPageNumber;
    });
  };

  if (!currentPDF) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
        <p className="text-gray-500">No PDF selected</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={() => changePage(-1)} 
          disabled={pageNumber <= 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages || '--'}
        </span>
        <button 
          onClick={() => changePage(1)} 
          disabled={!!(numPages && pageNumber >= numPages)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
      <div className="flex-grow overflow-auto border rounded-lg">
        <Document
          file={currentPDF.url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="flex items-center justify-center h-full">Loading PDF...</div>}
          error={<div className="flex items-center justify-center h-full text-red-500">Failed to load PDF</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            width={600}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
