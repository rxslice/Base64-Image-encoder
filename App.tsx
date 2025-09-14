
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import type { ImageInfo } from './types';

const App: React.FC = () => {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Invalid file type. Please upload an image.');
      setImageInfo(null);
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const base64String = dataUrl.split(',')[1];
      setImageInfo({
        file,
        dataUrl,
        base64String,
      });
    };
    reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
        setImageInfo(null);
    };
    reader.readAsDataURL(file);
  }, []);
  
  const handleClear = useCallback(() => {
    setImageInfo(null);
    setError(null);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800">
      <Header />
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-300">
          {!imageInfo ? (
            <ImageUploader onFileSelect={handleFileSelect} error={error} />
          ) : (
            <ResultDisplay imageInfo={imageInfo} onClear={handleClear} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
