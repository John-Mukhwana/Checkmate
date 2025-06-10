// src/components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50 px-4">
        <div className="text-center">
          <div className="relative w-[clamp(48px,16vw,64px)] h-[clamp(48px,16vw,64px)] mx-auto mb-4">
            <div className="absolute inset-0 border-[clamp(2px,0.5vw,4px)] border-t-transparent border-primary-500 rounded-full animate-spin-smooth"></div>
            <div
              className="absolute w-[clamp(10px,2.5vw,16px)] h-[clamp(10px,2.5vw,16px)] bg-accent-500 rounded-full animate-orbit"
              style={{ top: 'calc(-1 * clamp(6px, 1.5vw, 8px))', left: '50%', transform: 'translateX(-50%)' }}
            ></div>
            <div className="absolute inset-[clamp(6px,1.5vw,8px)] bg-primary-200 rounded-full animate-pulse-smooth"></div>
          </div>
          <p className="text-gray-700 text-[clamp(14px,4vw,18px)] font-medium font-sans tracking-wide animate-fade-in">
          💡 Great things take time. Thanks for waiting!
          </p>
        </div>
      </div>
      <style>{`
        @keyframes spin-smooth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit {
          0% { transform: translateX(-50%) rotate(0deg) translateY(calc(-1 * clamp(20px, 5vw, 28px))); }
          100% { transform: translateX(-50%) rotate(360deg) translateY(calc(-1 * clamp(20px, 5vw, 28px))); }
        }
        @keyframes pulse-smooth {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-spin-smooth {
          animation: spin-smooth 1.5s linear infinite;
        }
        .animate-orbit {
          animation: orbit 1.2s linear infinite;
        }
        .animate-pulse-smooth {
          animation: pulse-smooth 1.5s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in forwards;
        }
      `}</style>
    </>
  );
};

export default Loading;