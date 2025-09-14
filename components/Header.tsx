
import React from 'react';

const LogoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8h4l4 8z" clipRule="evenodd" />
        <path d="M20 7a2 2 0 00-2-2h-2v12h2a2 2 0 002-2V7z" />
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center">
                    <LogoIcon />
                    <h1 className="text-2xl sm:text-3xl font-bold ml-3 tracking-tight">Base64 Image Encoder</h1>
                </div>
                <p className="text-indigo-200 mt-2 sm:mt-0">Instantly convert your images to Base64</p>
            </div>
        </header>
    );
};
