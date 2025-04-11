import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PDFsPage from './PDFsPage';
import ChatPage from './ChatPage';
import BlogPage from './BlogPage';
import NotFound from './NotFound';
import Navbar from '../components/Navbar';
import { PDFProvider } from '../context/PDFContext';
import PDFUploader from '../components/PDFUploader';
import PDFList from '../components/PDFList';
import ChatRoom from '../components/ChatRoom';
import PDFViewer from '../components/PDFViewer';

const ChatwithPdf = () => {
  return (
    <PDFProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <PDFUploader />
          <PDFList />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="upload-pdfs" element={<PDFsPage />} />
            <Route path="chat" element={<ChatRoom />} />
            <Route path="viewer" element={<PDFViewer />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </PDFProvider>
  );
};

export default ChatwithPdf;
