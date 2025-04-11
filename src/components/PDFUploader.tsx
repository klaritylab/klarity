import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { usePDFContext } from '@/context/PDFContext';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

const PDFUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addPDF, isUploading } = usePDFContext();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    try {
      await addPDF(file);
      toast.success(`Successfully uploaded ${file.name}`);
    } catch (error) {
      toast.error('Error uploading file');
      console.error(error);
    }

    // Reset the input value to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button
        onClick={handleUploadClick}
        className="bg-chatpdf-purple hover:bg-purple-700 text-white"
        disabled={isUploading}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload PDF
      </Button>
    </div>
  );
};

export default PDFUploader;