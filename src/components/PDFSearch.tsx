import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type PDFSearchProps = {
  onSearch: (query: string) => void;
};

const PDFSearch = ({ onSearch }: PDFSearchProps) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search for PDFs..."
        value={query}
        onChange={handleChange}
        className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-chatpdf-purple focus:ring-1 focus:ring-chatpdf-purple"
      />
    </div>
  );
};

export default PDFSearch;