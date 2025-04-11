import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { usePDFContext } from '@/context/PDFContext';
import { generateGeminiResponse, GeminiMessage, askQuestionAboutPdf, extractPdfContent, getGeminiApiKey } from '@/services/geminiService';
import { toast } from 'sonner';

type ChatInputProps = {
  pdfMode?: boolean;
};

const ChatInput = ({ pdfMode = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage, messages, currentPDF } = usePDFContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    addMessage({
      sender: 'You',
      text: message.trim(),
    });
    
    const userMessage = message.trim();
    setMessage('');
    
    if (pdfMode && !currentPDF) {
      addMessage({
        sender: 'System',
        text: 'Please upload and select a PDF first to chat about it.',
      });
      return;
    }

    if (pdfMode && !getGeminiApiKey()) {
      addMessage({
        sender: 'System',
        text: 'Please set your Gemini API key in settings to chat with your PDF.',
      });
      return;
    }
    
    // Processing message with Gemini
    setIsLoading(true);
    
    try {
      let response;

      if (pdfMode && currentPDF) {
        // Extract PDF content (would be implemented with a PDF parser in a real app)
        const pdfContent = await extractPdfContent(currentPDF.url);
        
        // Format previous messages for context
        const previousMessages: GeminiMessage[] = [];
        let recentMessages = messages.slice(-6); // Last 6 messages for context
        
        for (let i = 0; i < recentMessages.length; i++) {
          const msg = recentMessages[i];
          if (msg.sender === 'You') {
            previousMessages.push({
              role: 'user',
              parts: [{ text: msg.text }]
            });
          } else if (msg.sender === 'ChatPDF') {
            previousMessages.push({
              role: 'model',
              parts: [{ text: msg.text }]
            });
          }
        }
        
        // Use the PDF-specific function
        response = await askQuestionAboutPdf(
          currentPDF.name,
          pdfContent,
          userMessage,
          previousMessages
        );
      } else {
        // Convert existing messages to Gemini format
        const geminiMessages: GeminiMessage[] = [];
        
        // Add the current conversation
        messages.slice(-10).forEach(msg => {
          geminiMessages.push({
            role: msg.sender === 'You' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        });
        
        // Add the new user message
        geminiMessages.push({
          role: 'user',
          parts: [{ text: userMessage }]
        });
        
        response = await generateGeminiResponse(geminiMessages);
      }
      
      addMessage({
        sender: 'ChatPDF',
        text: response,
      });
    } catch (error) {
      console.error('Error processing message with Gemini:', error);
      toast.error('Failed to get a response. Please try again.');
      
      addMessage({
        sender: 'System',
        text: 'Sorry, I had trouble processing your request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <Input
        placeholder={pdfMode ? "Ask a question about this PDF..." : "Type your message..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow"
        disabled={isLoading || (pdfMode && !currentPDF)}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !message.trim() || (pdfMode && !currentPDF)}
        className="bg-chatpdf-purple hover:bg-purple-700"
      >
        <Send className="h-4 w-4" />
        <span className="ml-2">Send</span>
      </Button>
    </form>
  );
};

export default ChatInput;