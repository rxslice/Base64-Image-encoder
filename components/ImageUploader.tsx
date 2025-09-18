
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

const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
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
  
  const baseClasses = 'group w-full p-8 text-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out';
  const stateClasses = isDraggingOver 
    ? 'border-purple-600 bg-purple-50 scale-[1.05] shadow-2xl' 
    : 'border-slate-300 bg-slate-50 hover:border-indigo-500 hover:bg-indigo-50 hover:scale-[1.02] hover:shadow-lg';

  return (
    <div 
        className={`${baseClasses} ${stateClasses}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        aria-label="Image uploader dropzone"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml"
        aria-hidden="true"
      />
      <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
        <div className="transform transition-transform duration-300 group-hover:scale-110">
            <UploadIcon />
        </div>
        <p className="text-lg font-semibold text-slate-700">
            Drag & drop your image here
        </p>
        <p className="text-slate-500">
            or <span className="text-indigo-600 font-medium">click to browse files</span>
        </p>
        {error && (
            <div className="flex items-center justify-center bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg mt-4 text-sm" role="alert">
                <ErrorIcon />
                <p>{error}</p>
            </div>
        )}
      </div>
    </div>
  );
};
