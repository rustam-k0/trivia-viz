import React from 'react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => (
  <header className={`py-8 relative fade-in ${className}`}>
    <h1 className="text-5xl md:text-7xl font-black tracking-widest text-shadow-glow">
      TRIVIEW
    </h1>
    <p className="text-xl text-text-secondary mt-1">
      Interactive trivia data visualization
    </p>
  </header>
);