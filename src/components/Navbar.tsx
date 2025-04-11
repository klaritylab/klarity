
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Globe } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <BookOpen className="h-6 w-6" />
          <span>ChatPDF</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-sm font-medium hover:text-chatpdf-purple transition-colors">
          Home
        </Link>
        <Link to="/pdfs" className="text-sm font-medium hover:text-chatpdf-purple transition-colors">
          pdfs
        </Link>
        <Link to="/blog" className="text-sm font-medium hover:text-chatpdf-purple transition-colors">
          blog
        </Link>
        <Link to="/chat" className="flex items-center space-x-1 text-sm font-medium hover:text-chatpdf-purple transition-colors">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 10.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 14.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>chat</span>
        </Link>
        
        <Globe className="h-5 w-5 text-gray-500" />
        
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-chatpdf-purple text-white">DF</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;