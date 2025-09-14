
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-4">
            <div className="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500">
                <p>&copy; {new Date().getFullYear()} Base64 Image Encoder. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
