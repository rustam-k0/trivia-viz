import React from 'react';

interface AnalysisCardProps {
  title: string;
  children: React.ReactNode;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col h-full bg-transparent rounded-lg">
      <h2 className="text-base sm:text-lg font-semibold text-cyber-primary text-glow-subtle text-center">
        {title}
      </h2>
      <div className="flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AnalysisCard;