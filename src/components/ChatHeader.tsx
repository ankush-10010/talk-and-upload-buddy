
import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
          <p className="text-sm text-gray-500">Your intelligent chat companion</p>
        </div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default ChatHeader;
