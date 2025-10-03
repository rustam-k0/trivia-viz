import React from 'react';

interface DataSummaryProps {
  totalCategories: number;
  totalQuestions: number;
  difficultyLevels: number;
}

const DataSummary: React.FC<DataSummaryProps> = ({ 
  totalCategories, 
  totalQuestions, 
  difficultyLevels 
}) => (
  <div className="cyber-panel p-6">
    <h3 className="text-subtitle text-cyber-primary mb-6">SYSTEM METRICS DASHBOARD</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="cyber-metric text-center p-6">
        <p className="text-display text-accent mb-2">
          {totalCategories}
        </p>
        <p className="text-caption text-cyber-secondary uppercase tracking-wider">
          Knowledge Domains
        </p>
      </div>
      <div className="cyber-metric text-center p-6">
        <p className="text-display text-accent mb-2">
          {totalQuestions}
        </p>
        <p className="text-caption text-cyber-secondary uppercase tracking-wider">
          Data Entities
        </p>
      </div>
      <div className="cyber-metric text-center p-6">
        <p className="text-display text-accent mb-2">
          {difficultyLevels}
        </p>
        <p className="text-caption text-cyber-secondary uppercase tracking-wider">
          Complexity Tiers
        </p>
      </div>
    </div>
  </div>
);

export default DataSummary;