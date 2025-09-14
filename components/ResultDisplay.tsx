
import React, { useState, useCallback } from 'react';
import type { ImageInfo } from '../types';

interface ResultDisplayProps {
  imageInfo: ImageInfo;
  onClear: () => void;
}

const CopyIcon: React.FC<{copied: boolean}> = ({ copied }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        )}
    </svg>
);

const ClearIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageInfo, onClear }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(imageInfo.base64String).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [imageInfo.base64String]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex-shrink-0">
                <h3 className="text-lg font-semibold mb-3 text-slate-700">Image Preview</h3>
                <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                    <img src={imageInfo.dataUrl} alt="Preview" className="max-w-full max-h-full object-contain"/>
                </div>
                <div className="mt-4 text-sm space-y-2 text-slate-600">
                    <p><strong>File:</strong> <span className="break-all">{imageInfo.file.name}</span></p>
                    <p><strong>Type:</strong> <span>{imageInfo.file.type}</span></p>
                    <p><strong>Size:</strong> <span>{formatFileSize(imageInfo.file.size)}</span></p>
                </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col">
                <h3 className="text-lg font-semibold mb-3 text-slate-700">Base64 String</h3>
                <textarea
                    readOnly
                    className="w-full h-48 md:h-full flex-grow p-4 border border-slate-300 rounded-lg bg-slate-50 font-mono text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                    value={imageInfo.base64String}
                />
            </div>
        </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopy}
          className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300`}
        >
          <CopyIcon copied={copied}/>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          onClick={onClear}
          className="w-full sm:w-auto flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <ClearIcon />
          Encode Another
        </button>
      </div>
    </div>
  );
};
