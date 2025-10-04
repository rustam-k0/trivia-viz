// src/components/Analysis/CategoryAnalysis.tsx

import React, { useState, useCallback, useMemo } from 'react';
import { useTrivia } from '../../context/TriviaContext';
import { getColorForCategory } from '../../utils/colorManager'; // <-- Исправленный путь

import AnalysisCard from '../UI/AnalysisCard';
import CategoryPieChart from '../Charts/CategoryPieChart';
import CategoryLegend from '../UI/CategoryLegend';

const CategoryAnalysis: React.FC = () => {
  const { categoryData, filter, setFilter, questionCount } = useTrivia();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const memoizedData = useMemo(() => {
    return categoryData.map(d => ({
      ...d,
      color: getColorForCategory(d.name),
    }));
  }, [categoryData]);

  const onPieEnter = useCallback((_: any, index: number) => { setActiveIndex(index); }, []);
  const onMouseLeave = useCallback(() => { setActiveIndex(null); }, []);
  const handleCategoryClick = useCallback((name: string) => {
    setFilter(prevFilter => (name === prevFilter ? 'All' : name));
  }, [setFilter]);

  const totalQuestions = useMemo(() => 
    categoryData.reduce((sum, item) => sum + item.count, 0),
    [categoryData]
  );

  return (
    <AnalysisCard title="Category Breakdown">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start flex-grow">
        <CategoryPieChart
          data={memoizedData}
          questionCount={filter === 'All' ? totalQuestions : questionCount}
          filter={filter}
          activeIndex={activeIndex}
          onPieEnter={onPieEnter}
          onMouseLeave={onMouseLeave}
          onCategoryClick={handleCategoryClick}
        />
        <CategoryLegend
          data={memoizedData}
          filter={filter}
          onMouseEnter={onPieEnter}
          onMouseLeave={onMouseLeave}
          onCategoryClick={handleCategoryClick}
        />
      </div>
    </AnalysisCard>
  );
};

export default CategoryAnalysis;