
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import FileUpload from './FileUpload';

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      onSendMessage(message.trim(), selectedFile || undefined);
      setMessage('');
      setSelectedFile(null);
      setShowFileUpload(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-white p-4">
      {showFileUpload && (
        <div className="mb-4">
          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            onRemoveFile={() => setSelectedFile(null)}
          />
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="min-h-[44px] max-h-32 resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            rows={1}
          />
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setShowFileUpload(!showFileUpload)}
          className={`${showFileUpload ? 'bg-blue-50 border-blue-300' : ''}`}
        >
          <Upload className="w-4 h-4" />
        </Button>
        
        <Button
          type="submit"
          disabled={(!message.trim() && !selectedFile) || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
