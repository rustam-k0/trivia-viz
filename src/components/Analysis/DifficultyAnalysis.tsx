import React from 'react';
import { useTrivia } from '../../context/TriviaContext';
import DifficultyBarChart from '../Charts/DifficultyBarChart';
import AnalysisCard from '../UI/AnalysisCard';

const DifficultyAnalysis: React.FC = () => {
  const { difficultyData } = useTrivia();

  return (
    <AnalysisCard title="Difficulty Distribution">
      <div className="h-full p-2">
        <DifficultyBarChart data={difficultyData} />
      </div>
    </AnalysisCard>
  );
};

export default DifficultyAnalysis;