
import React, { useCallback, useState } from 'react';
import { Upload, X, File, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile, onRemoveFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  if (selectedFile) {
    return (
      <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
        {getFileIcon(selectedFile)}
        <span className="text-sm text-gray-700 truncate max-w-32">
          {selectedFile.name}
        </span>
        <button
          onClick={onRemoveFile}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer",
        isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileInput}
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
      <div className="flex flex-col items-center gap-2 text-gray-500">
        <Upload className="w-6 h-6" />
        <span className="text-sm">Upload file or image</span>
      </div>
    </div>
  );
};

export default FileUpload;
