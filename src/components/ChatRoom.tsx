import React, { useEffect, useRef } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { usePDFContext } from '@/context/PDFContext'
import { getGeminiApiKey } from '@/services/geminiService';

type ChatRoomProps = {
  pdfMode?: boolean;
};

const ChatRoom = ({ pdfMode = false }: ChatRoomProps) => {
  const { messages, currentPDF } = usePDFContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasApiKey = !!getGeminiApiKey();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg flex justify-between">
          <span>Chat with {pdfMode && currentPDF ? currentPDF.name : 'ChatPDF'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full flex-col space-y-4">
            {!hasApiKey && pdfMode ? (
              <p className="text-orange-500 text-center bg-orange-50 p-4 rounded-lg">
                Please set your Gemini API key in the settings to chat with your PDF.
              </p>
            ) : (
              <p className="text-gray-500 text-center">
                {pdfMode 
                  ? "Ask questions about the content of your PDF." 
                  : "No messages yet. Start a conversation!"}
              </p>
            )}
            {pdfMode && (
              <div className="text-sm text-gray-500 max-w-md text-center">
                <p>Example questions:</p>
                <ul className="mt-2 space-y-2">
                  <li className="bg-gray-100 p-2 rounded-lg">"What are the key points in this document?"</li>
                  <li className="bg-gray-100 p-2 rounded-lg">"Summarize the content of this PDF."</li>
                  <li className="bg-gray-100 p-2 rounded-lg">"What does the document say about [topic]?"</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.sender === 'You'}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-4 border-t">
        <ChatInput pdfMode={pdfMode} />
      </CardFooter>
    </Card>
  );
};

export default ChatRoom;