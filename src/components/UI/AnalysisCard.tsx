// src/components/UI/AnalysisCard.tsx

import React from 'react';

interface AnalysisCardProps {
  title: string;
  children: React.ReactNode;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-black mb-8 text-cyber-primary border-b border-border-primary pb-3 text-glow-subtle">
        {title.toUpperCase()}
      </h2>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default AnalysisCard;