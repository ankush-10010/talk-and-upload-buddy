import React, { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import ChatHeader from '@/components/ChatHeader';
import { sendMessage } from '@/services/chatService';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, file?: File) => {
    if (!content && !file) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content || (file ? `Uploaded: ${file.name}` : ''),
      role: 'user',
      timestamp: new Date(),
      file: file ? {
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      } : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content, file);
      
      if (response.text || response.file) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.text || '',
          role: 'assistant',
          timestamp: new Date(),
          file: response.file ? {
            name: 'question_paper.pdf',
            type: response.file.type,
            url: URL.createObjectURL(response.file)
          } : undefined,
        };
  
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Sorry, the assistant did not provide a response.',
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please check your backend configuration in src/config/backend.ts",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please check the backend configuration and try again.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <ChatHeader />
        
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-md border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
