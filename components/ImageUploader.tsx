
import React, { useState, useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  error: string | null;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, error }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const borderColor = isDraggingOver ? 'border-indigo-500' : 'border-slate-300';
  const bgColor = isDraggingOver ? 'bg-indigo-50' : 'bg-slate-50';

  return (
    <div 
        className={`group w-full p-8 text-center border-2 border-dashed ${borderColor} ${bgColor} rounded-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02]`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadIcon />
        <p className="text-lg font-semibold text-slate-700">
            Drag & drop your image here
        </p>
        <p className="text-slate-500">
            or <span className="text-indigo-600 font-medium">click to browse files</span>
        </p>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};
