import React from 'react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen bg-white p-4">
    <div className="bg-white p-10 rounded-lg shadow-sm max-w-2xl text-center border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}>
        Error Loading Data
      </h2>
      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
        {message}
      </p>
    </div>
  </div>
);

export default ErrorState;