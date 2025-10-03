import React from 'react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="card p-8 max-w-md text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Unable to Load Data
      </h2>
      <p className="text-gray-600 leading-relaxed">
        {message}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="btn-primary mt-6"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ErrorState;