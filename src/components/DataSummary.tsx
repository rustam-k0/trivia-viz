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
  <div className="mt-12 bg-gray-100 p-8 rounded-lg border border-gray-300">
    <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ letterSpacing: '0.5px' }}>
      Data Summary
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="text-center">
        <p className="text-3xl font-bold text-blue-600" style={{ letterSpacing: '0.5px' }}>
          {totalCategories}
        </p>
        <p className="text-sm font-medium text-gray-600 mt-2 uppercase tracking-wider">
          Categories
        </p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-blue-600" style={{ letterSpacing: '0.5px' }}>
          {totalQuestions}
        </p>
        <p className="text-sm font-medium text-gray-600 mt-2 uppercase tracking-wider">
          Total Questions
        </p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-blue-600" style={{ letterSpacing: '0.5px' }}>
          {difficultyLevels}
        </p>
        <p className="text-sm font-medium text-gray-600 mt-2 uppercase tracking-wider">
          Difficulty Levels
        </p>
      </div>
    </div>
  </div>
);

export default DataSummary;