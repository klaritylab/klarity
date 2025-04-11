import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePDFContext } from '@/context/PDFContext';
import ChatRoom from '@/components/ChatRoom';
import PDFViewer from '@/components/PDFViewer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getGeminiApiKey, setGeminiApiKey } from '@/services/geminiService';

const ChatPage = () => {
  const { currentPDF } = usePDFContext();
  const [apiKey, setApiKey] = useState(getGeminiApiKey());

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKey);
  };

  return (
    <div className="container mx-auto py-4 px-4 h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Link to="/pdfs" className="flex items-center text-gray-600 hover:text-chatpdf-purple mr-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            <span>Back to PDFs</span>
          </Link>
          
          {currentPDF && (
            <h1 className="text-xl font-bold text-gray-800">{currentPDF.name}</h1>
          )}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="mr-1 h-4 w-4" />
              <span>Settings</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>API Settings</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="apiKey">Gemini API Key</Label>
                <Input 
                  id="apiKey" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                  placeholder="Enter your Gemini API key"
                  type="password"
                />
                <Button onClick={handleSaveApiKey} className="mt-2 w-full">
                  Save API Key
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!currentPDF ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please upload and select a PDF first to chat about it.{' '}
                <Link to="/pdfs" className="font-medium underline">
                  Go to My PDFs
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <div className="h-full">
            <PDFViewer />
          </div>
          <div className="h-full">
            <ChatRoom pdfMode={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;