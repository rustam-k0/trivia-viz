import React from 'react';

const PADDING_CLASSES = "px-4 sm:px-6 lg:px-20 max-w-full";

const Header: React.FC = () => {
  return (
    <header className={`py-6 sm:py-8 relative fade-in ${PADDING_CLASSES}`}>
      <button 
        onClick={() => window.location.reload()}
        className="text-left appearance-none bg-transparent border-none p-0 m-0 cursor-pointer transition-opacity duration-300 hover:opacity-80"
        title="Reload Data"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-widest text-shadow-glow">
          Triview
        </h1>
      </button>
      <p className="text-base sm:text-lg md:text-xl text-text-secondary mt-1">
        Interactive trivia data visualization
      </p>
    </header>
  );
};

export default Header;