
import React from 'react';
import { Message } from '@/types/chat';
import { File, Image } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-4 rounded-2xl ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-md'
              : 'bg-white text-gray-800 rounded-bl-md shadow-md border'
          }`}
        >
          {message.file && (
            <div className="mb-2 p-2 bg-black/10 rounded-lg flex items-center gap-2">
              {message.file.type.startsWith('image/') ? (
                <Image className="w-4 h-4" />
              ) : (
                <File className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{message.file.name}</span>
            </div>
          )}
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
