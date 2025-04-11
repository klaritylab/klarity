import React, { useState } from 'react';
import { usePDFContext } from '@/context/PDFContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Minus, Plus, RotateCcw, Share2, Trash2 } from 'lucide-react';

const PDFViewer = () => {
  const { currentPDF, deletePDF } = usePDFContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(15); // This would be dynamically set in a real implementation
  const [zoom, setZoom] = useState(100);

  if (!currentPDF) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No PDF selected</p>
      </div>
    );
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <h3 className="font-medium">{currentPDF.name}</h3>
          <span className="ml-2 text-sm text-gray-500">{Math.round(currentPDF.size || 0)} KB</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deletePDF(currentPDF.id)}
            aria-label="Delete PDF"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Share PDF"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <input 
              type="number" 
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="w-12 text-center border rounded"
              min={1}
              max={totalPages}
            />
            <span className="mx-1">/</span>
            <span>{totalPages}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            aria-label="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-16 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(100)}
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-auto flex justify-center bg-gray-100 p-4">
        <iframe
          src={currentPDF.url}
          className="w-full h-full"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
          title={currentPDF.name}
        />
      </div>
    </div>
  );
};

export default PDFViewer;