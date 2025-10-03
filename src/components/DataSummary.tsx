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
  <div className="card p-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-6">Dataset Overview</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center p-6 bg-blue-50 rounded-lg">
        <p className="text-3xl font-bold text-blue-600 mb-2">
          {totalCategories}
        </p>
        <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">
          Categories
        </p>
      </div>
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <p className="text-3xl font-bold text-green-600 mb-2">
          {totalQuestions}
        </p>
        <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">
          Total Questions
        </p>
      </div>
      <div className="text-center p-6 bg-purple-50 rounded-lg">
        <p className="text-3xl font-bold text-purple-600 mb-2">
          {difficultyLevels}
        </p>
        <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">
          Difficulty Levels
        </p>
      </div>
    </div>
  </div>
);

export default DataSummary;