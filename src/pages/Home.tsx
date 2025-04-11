import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Upload, BookOpen } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Chat with Your PDFs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Upload your PDF documents and start asking questions about them. Get instant, accurate responses powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/pdfs">
                <Button size="lg" className="bg-chatpdf-purple hover:bg-purple-700 text-white">
                  Upload PDF <Upload className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="outline">
                  Try Chat Demo <MessageSquare className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="h-16 w-16 bg-purple-100 text-chatpdf-purple mx-auto rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Upload Your PDF</h3>
                <p className="text-gray-600">Simply upload any PDF document you want to chat about.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="h-16 w-16 bg-purple-100 text-chatpdf-purple mx-auto rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Ask Questions</h3>
                <p className="text-gray-600">Ask any question about your document in natural language.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="h-16 w-16 bg-purple-100 text-chatpdf-purple mx-auto rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Get Instant Answers</h3>
                <p className="text-gray-600">Receive accurate, AI-powered responses about your document content.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-chatpdf-purple text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Chat with Your PDFs?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of students, researchers, and professionals who use ChatPDF to interact with their documents.
            </p>
            <Link to="/pdfs">
              <Button size="lg" variant="secondary" className="bg-white text-chatpdf-purple hover:bg-gray-100">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
