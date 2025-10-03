import React from 'react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div className="min-h-screen bg-cyber-primary flex items-center justify-center p-4 relative">
    <div className="cyber-bg"></div>
    <div className="cyber-grid"></div>
    <div className="cyber-card p-6 lg:p-8 max-w-md text-center relative z-10 cyber-fade-in">
      <div className="w-12 h-12 lg:w-16 lg:h-16 border-2 border-cyber rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
        <svg className="w-6 h-6 lg:w-8 lg:h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-subtitle text-cyber-primary mb-2 lg:mb-3">
        SYSTEM ERROR
      </h2>
      <p className="text-body text-cyber-secondary mb-4 lg:mb-6 leading-relaxed">
        {message}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="cyber-button"
      >
        REINITIALIZE
      </button>
    </div>
  </div>
);

export default ErrorState;