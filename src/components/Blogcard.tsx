import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
};

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-200"
        />
      </div>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">{post.category}</span>
          <span className="text-xs text-gray-500 ml-auto">{post.date}</span>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="mr-1 h-3 w-3" />
          <span>{post.readTime} read</span>
        </div>
        <Link 
          to={`/blog/${post.slug}`} 
          className="text-chatpdf-purple hover:text-purple-700 text-sm font-medium inline-flex items-center"
        >
          Read More <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
