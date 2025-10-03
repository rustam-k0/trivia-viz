import React from 'react';

const Loading: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700">
        Loading Trivia Data
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Fetching questions from Open Trivia DB...
      </p>
    </div>
  </div>
);

export default Loading;