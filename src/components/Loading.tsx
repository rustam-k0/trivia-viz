import React from 'react';

const Loading: React.FC = () => (
  <div className="min-h-screen bg-cyber-primary flex items-center justify-center relative">
    <div className="cyber-bg"></div>
    <div className="cyber-grid"></div>
    <div className="text-center relative z-10">
      <div className="relative mb-4 lg:mb-6">
        <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-cyber rounded-full"></div>
        <div className="w-16 h-16 lg:w-20 lg:h-20 border-t-2 border-accent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-accent rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cyber-pulse"></div>
      </div>
      <p className="text-body text-cyber-primary mb-2">
        INITIALIZING
      </p>
      <p className="text-caption text-cyber-secondary">
        Accessing data streams
      </p>
    </div>
  </div>
);

export default Loading;