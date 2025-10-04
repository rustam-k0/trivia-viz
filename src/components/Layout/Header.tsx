import React from 'react';

const PADDING_CLASSES = "px-10 sm:px-20 lg:px-48 max-w-full mx-auto";

const Header: React.FC = () => {
  return (
    <header className={`py-8 relative fade-in ${PADDING_CLASSES}`}>
      <button 
        onClick={() => window.location.reload()}
        className="text-left appearance-none bg-transparent border-none p-0 m-0 cursor-pointer transition-opacity duration-300 hover:opacity-80"
        title="Reload Data"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-widest text-shadow-glow">
          TRIVIEW
        </h1>
      </button>
      <p className="text-xl text-text-secondary mt-1">
        Interactive trivia data visualization
      </p>
    </header>
  );
};

export default Header;