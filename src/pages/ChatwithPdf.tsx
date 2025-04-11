import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PDFsPage from './PDFsPage';
import ChatPage from './ChatPage';
import BlogPage from './BlogPage';
import NotFound from './NotFound';
import Navbar from '@/components/Navbar';

import { PDFProvider } from '@/context/PDFContext';

const ChatwithPdf = () => {
  return (
    <PDFProvider>
      {/* <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/pdf" element={<Home />} />
            <Route path="/upload-pdfs" element={<PDFsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div> */}
    </PDFProvider>
  );
};

export default ChatwithPdf;