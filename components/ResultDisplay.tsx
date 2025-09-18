
import React, { useState, useCallback, useMemo } from 'react';
import type { ImageInfo } from '../types';

interface ResultDisplayProps {
  imageInfo: ImageInfo;
  onClear: () => void;
}

type CopyMode = 'raw' | 'dataUrl';

const CopyIcon: React.FC<{copied: boolean}> = ({ copied }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 transition-transform duration-300 ${copied ? 'scale-125 text-green-300' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
  const [wrapLines, setWrapLines] = useState(false);
  const [copyMode, setCopyMode] = useState<CopyMode>('raw');

  const formatBase64WithLineBreaks = (str: string): string => {
    const lineLength = 76;
    const regex = new RegExp(`.{1,${lineLength}}`, 'g');
    const parts = str.match(regex);
    return parts ? parts.join('\n') : str;
  };

  const displayedString = useMemo(() => {
    const stringToDisplay = copyMode === 'dataUrl' ? imageInfo.dataUrl : imageInfo.base64String;
    if (wrapLines) {
      return formatBase64WithLineBreaks(stringToDisplay);
    }
    return stringToDisplay;
  }, [imageInfo.base64String, imageInfo.dataUrl, wrapLines, copyMode]);

  const handleCopy = useCallback(() => {
    const stringToCopy = copyMode === 'dataUrl' ? imageInfo.dataUrl : imageInfo.base64String;

    navigator.clipboard.writeText(stringToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [copyMode, imageInfo.dataUrl, imageInfo.base64String]);

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
                <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center p-2">
                    <img src={imageInfo.dataUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-md"/>
                </div>
                <div className="mt-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <dl className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                            <dt className="font-semibold text-slate-700 flex-shrink-0">File:</dt>
                            <dd className="text-right break-all">{imageInfo.file.name}</dd>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                            <dt className="font-semibold text-slate-700 flex-shrink-0">Type:</dt>
                            <dd className="text-right">{imageInfo.file.type}</dd>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                            <dt className="font-semibold text-slate-700 flex-shrink-0">Size:</dt>
                            <dd className="text-right">{formatFileSize(imageInfo.file.size)}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-slate-700">Base64 String</h3>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="wrap-lines"
                            checked={wrapLines}
                            onChange={() => setWrapLines(prev => !prev)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <label htmlFor="wrap-lines" className="ml-2 block text-sm text-slate-600 select-none cursor-pointer">
                            Add line breaks
                        </label>
                    </div>
                </div>
                <textarea
                    readOnly
                    className="w-full h-48 md:h-full flex-grow p-4 border border-slate-300 rounded-lg bg-slate-50 font-mono text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                    value={displayedString}
                    aria-label="Base64 encoded string"
                />
            </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
                <span className="text-sm font-medium text-slate-600 mr-3">Copy Format:</span>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        onClick={() => setCopyMode('raw')}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg border transition-colors ${copyMode === 'raw' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                    >
                        Raw
                    </button>
                    <button
                        type="button"
                        onClick={() => setCopyMode('dataUrl')}
                        className={`px-4 py-2 text-sm font-medium rounded-r-md border border-l-0 transition-colors ${copyMode === 'dataUrl' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                    >
                        Data URL
                    </button>
                </div>
            </div>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-auto flex-1">
                    <button
                        onClick={handleCopy}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        <CopyIcon copied={copied}/>
                        Copy to Clipboard
                    </button>
                    <div 
                        role="status"
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-slate-800 text-white text-sm rounded-md px-3 py-1 shadow-lg transition-all duration-300 ease-in-out pointer-events-none ${copied ? 'opacity-100' : 'opacity-0'}`}
                    >
                        Copied!
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
                    </div>
                </div>
                <button
                    onClick={onClear}
                    className="w-full sm:w-auto flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors transform hover:scale-105 hover:shadow-md"
                >
                    <ClearIcon />
                    Encode Another
                </button>
            </div>
        </div>
    </div>
  );
};
