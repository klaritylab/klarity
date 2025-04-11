import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChatMessage as ChatMessageType } from '@/context/PDFContext';
import { format } from 'date-fns';

type ChatMessageProps = {
  message: ChatMessageType;
  isCurrentUser: boolean;
};

const ChatMessage = ({ message, isCurrentUser }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return format(date, 'HH:mm');
  };

  return (
    <div className={`flex gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-200 text-gray-700">
            {message.sender.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isCurrentUser ? 'bg-chatpdf-purple text-white' : 'bg-gray-100'} p-3 rounded-lg`}>
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs font-medium ${isCurrentUser ? 'text-white/80' : 'text-gray-600'}`}>
            {isCurrentUser ? 'You' : message.sender}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <div className="text-right">
          <span className={`text-xs ${isCurrentUser ? 'text-white/70' : 'text-gray-500'}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
      
      {isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-chatpdf-purple text-white">
            DF
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
