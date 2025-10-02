import React from 'react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-6 text-lg font-medium text-gray-800" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}>
        Loading Trivia Data
      </p>
    </div>
  </div>
);

export default Loading;