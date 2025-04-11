import React from 'react';
import Navbar from '../components/Navbar';

const UploadPDFsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Upload PDFs</h1>
        <p>PDF upload functionality will go here</p>
      </div>
    </div>
  );
};

export default UploadPDFsPage;
