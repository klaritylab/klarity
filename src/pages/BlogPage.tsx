import React, { useState } from 'react';
import { Input } from '../components/ui/input'; // Adjusted import path
import { Button } from '../components/ui/button'; // Adjusted import path
import { Search } from 'lucide-react';
import BlogCard, { BlogPost } from '../components/Blogcd'; // Adjusted import path
import Navbar from '../components/Navbar';

const BLOG_POSTS: BlogPost[] = [
  // Mock blog data
  {
    id: '1',
    title: 'Say Goodbye to Scrolling: Chatting With PDFs Made Easy',
    excerpt: 'Learn how ChatPDF is revolutionizing the way we interact with PDF documents...',
    date: '10/04/2025',
    readTime: '3 min',
    category: 'AI',
    imageUrl: 'public/lovable-uploads/07027dec-d787-4474-9254-b5ffb0bae729.png',
    slug: 'say-goodbye-to-scrolling'
  },
  // Additional blog posts...
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || post.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">ChatPDF Blog</h1>
        <p className="text-gray-600">Explore the latest articles about how to use ChatPDF...</p>
        <div className="flex items-center mb-4">
          <Input
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-1"
          />
          <Button>
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
