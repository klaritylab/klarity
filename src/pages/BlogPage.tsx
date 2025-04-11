import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import BlogCard, { BlogPost } from '@/components/Blogcard';

// Mock blog data
const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Say Goodbye to Scrolling: Chatting With PDFs Made Easy',
    excerpt: 'Learn how ChatPDF is revolutionizing the way we interact with PDF documents, making information retrieval faster and more efficient.',
    date: '10/04/2025',
    readTime: '3 min',
    category: 'AI',
    imageUrl: 'public/lovable-uploads/07027dec-d787-4474-9254-b5ffb0bae729.png',
    slug: 'say-goodbye-to-scrolling'
  },
  {
    id: '2',
    title: 'Ask Your Documents Anything: An Introduction to ChatPDF\'s Capabilities',
    excerpt: 'Discover the full range of features that ChatPDF offers to help you extract information from your PDF documents through conversation.',
    date: '03/04/2025',
    readTime: '3 min',
    category: 'AI',
    imageUrl: 'public/lovable-uploads/5348070b-7ed9-4544-b5e3-fe74e1cbf566.png',
    slug: 'ask-your-documents-anything'
  },
  {
    id: '3',
    title: 'Unlock Your Documents: How ChatPDF is Changing the Way We Read',
    excerpt: 'Explore how AI-powered document analysis is transforming research, study, and professional document workflows.',
    date: '03/04/2025',
    readTime: '3 min',
    category: 'AI',
    imageUrl: 'public/lovable-uploads/97e2800e-73aa-45cc-b788-1475f988afc4.png',
    slug: 'unlock-your-documents'
  },
  {
    id: '4',
    title: 'AI Meets PDFs: A Deep Dive into ChatPDF\'s Features',
    excerpt: 'Take a detailed look at the technology behind ChatPDF and how it makes document interaction more intuitive.',
    date: '02/04/2025',
    readTime: '3 min',
    category: 'ChatPDF',
    imageUrl: 'public/lovable-uploads/fe4d367b-6260-493a-bcdb-cb18abb72699.png',
    slug: 'ai-meets-pdfs'
  },
  {
    id: '5',
    title: 'How ChatPDF Can Revolutionize the Way You Read Documents',
    excerpt: 'Learn about the practical applications of ChatPDF for students, researchers, and professionals across various fields.',
    date: '02/04/2025',
    readTime: '3 min',
    category: 'ChatPDF',
    imageUrl: 'public/lovable-uploads/07027dec-d787-4474-9254-b5ffb0bae729.png',
    slug: 'revolutionize-document-reading'
  },
  {
    id: '6',
    title: 'ChatPDF: The Smart Way to Interact with Your PDFs',
    excerpt: 'Discover how ChatPDF\'s AI capabilities can help you extract insights from dense documents without the hassle of traditional reading.',
    date: '02/04/2025',
    readTime: '3 min',
    category: 'ChatPDF',
    imageUrl: 'public/lovable-uploads/5348070b-7ed9-4544-b5e3-fe74e1cbf566.png',
    slug: 'smart-way-to-interact'
  }
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
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-4">ChatPDF Blog</h1>
        <p className="text-gray-600">
          Explore the latest articles about how to use ChatPDF, its benefits, and how it can help you in work and study.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8 flex space-x-2">
        <Button
          variant={activeFilter === 'All' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('All')}
          className={activeFilter === 'All' ? 'bg-chatpdf-purple hover:bg-purple-700' : ''}
        >
          All
        </Button>
        <Button
          variant={activeFilter === 'AI' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('AI')}
          className={activeFilter === 'AI' ? 'bg-chatpdf-purple hover:bg-purple-700' : ''}
        >
          AI
        </Button>
        <Button
          variant={activeFilter === 'ChatPDF' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('ChatPDF')}
          className={activeFilter === 'ChatPDF' ? 'bg-chatpdf-purple hover:bg-purple-700' : ''}
        >
          ChatPDF
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
