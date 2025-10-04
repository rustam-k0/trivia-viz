// src/components/Analysis/DifficultyAnalysis.tsx

import React from 'react';
import { useTrivia } from '../../context/TriviaContext';
import DifficultyBarChart from '../Charts/DifficultyBarChart';
import AnalysisCard from '../UI/AnalysisCard';

const DifficultyAnalysis: React.FC = () => {
  const { difficultyData } = useTrivia();

  return (
    <AnalysisCard title="Difficulty Breakdown">
      <DifficultyBarChart data={difficultyData} />
    </AnalysisCard>
  );
};

export default DifficultyAnalysis;