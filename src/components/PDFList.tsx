import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { usePDFContext } from '@/context/PDFContext';
import { FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const PDFList = () => {
  const { pdfs, deletePDF, currentPDF, setCurrentPDF } = usePDFContext();

  if (pdfs.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">No PDFs found</h2>
        <p className="text-gray-600 mb-6">Try adjusting your search or upload a new PDF.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pdfs.map((pdf) => (
        <Card 
          key={pdf.id} 
          className={`cursor-pointer transition-all ${
            currentPDF?.id === pdf.id ? 'border-chatpdf-purple shadow-md' : 'hover:shadow-md'
          }`}
          onClick={() => setCurrentPDF(pdf)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <FileText className="h-10 w-10 text-chatpdf-purple mt-1" />
                <div>
                  <h3 className="font-medium line-clamp-1">{pdf.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(pdf.uploadDate, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePDF(pdf.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PDFList;