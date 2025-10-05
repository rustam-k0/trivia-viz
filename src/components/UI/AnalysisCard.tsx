// src/components/UI/AnalysisCard.tsx

import React from 'react';

interface AnalysisCardProps {
  title: string;
  children: React.ReactNode;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] rounded-lg shadow-xl">
      <h2 className="text-lg font-semibold text-cyber-primary p-3 text-glow-subtle">
        {title}
      </h2>
      <div className="flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AnalysisCard;