import React from 'react';

const LogoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 3.5c-1.2 1.2-1.5 3.2-.8 4.7 1 2.2 3.1 3.5 5.3 3.5h.1c.3 0 .5.2.5.5v.1c0 2.2-1.3 4.3-3.5 5.3-1.5.7-3.5.4-4.7-.8" />
        <path d="M9.5 20.5c1.2-1.2 1.5-3.2.8-4.7-1-2.2-3.1-3.5-5.3-3.5h-.1c-.3 0-.5-.2-.5-.5v-.1c0-2.2 1.3-4.3 3.5-5.3 1.5-.7 3.5-.4 4.7.8" />
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white shadow-2xl w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center">
                    <LogoIcon />
                    <h1 className="text-3xl sm:text-4xl font-bold ml-4 tracking-wider">Base64 Encoder</h1>
                </div>
                <p className="text-purple-300 mt-2 sm:mt-0">Instantly convert your images to Base64</p>
            </div>
        </header>
    );
};
