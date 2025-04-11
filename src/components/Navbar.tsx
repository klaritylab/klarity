import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">PDF Chat</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/upload-pdfs" className="hover:text-gray-300">Upload PDFs</Link>
          <Link to="/chat" className="hover:text-gray-300">Chat</Link>
          <Link to="/blog" className="hover:text-gray-300">Blog</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
