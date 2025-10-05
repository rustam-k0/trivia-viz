// src/App.tsx

import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Layout/Header';
import { useTrivia } from './context/TriviaContext';
import { getColorForCategory } from './utils/colorManager';

import AnalysisCard from './components/UI/AnalysisCard';
import CategoryPieChart from './components/Charts/CategoryPieChart';
import CategoryLegend from './components/UI/CategoryLegend';
import DifficultyAnalysis from './components/Analysis/DifficultyAnalysis';
import Loading from './components/UI/Loading';
import ErrorState from './components/UI/ErrorState';

const App: React.FC = () => {
  const { categoryData, filter, setFilter, questionCount, isLoading: loading, error } = useTrivia();
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
  
  const handleClearFilter = useCallback(() => {
    setFilter('All');
  }, [setFilter]);

  const totalQuestions = useMemo(() =>
    categoryData.reduce((sum, item) => sum + item.count, 0),
    [categoryData]
  );
  
  const isFiltered = filter !== 'All';

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  return (
    <>
      <div className="cyber-bg" />
      <div className="min-h-screen pb-16">
        <Header />

        <main className="px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
            {/* Left Column */}
            <div className="lg:col-span-2 fade-in flex flex-col">
              <AnalysisCard title="Category Distribution">
                <div className="flex-grow flex flex-col items-center justify-center p-12">
                   {isFiltered && (
                    <div className="w-full flex justify-center mb-4">
                      <div className="bg-[#1F2937] rounded-lg py-3 px-4 flex items-center justify-between max-w-md">
                        <span className="text-gray-300">Filtered by: <span className="font-semibold text-white">{filter}</span></span>
                        <button 
                          onClick={handleClearFilter} 
                          className="ml-4 bg-[#374151] hover:bg-gray-600 text-white font-bold py-1 px-3 rounded-md transition-colors duration-150 focus:outline-none"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}
                  <CategoryPieChart
                    data={memoizedData}
                    questionCount={filter === 'All' ? totalQuestions : questionCount}
                    filter={filter}
                    activeIndex={activeIndex}
                    onPieEnter={onPieEnter}
                    onMouseLeave={onMouseLeave}
                    onCategoryClick={handleCategoryClick}
                  />
                  <p className="text-gray-400 text-sm mt-4">
                    Click category to filter
                  </p>
                </div>
              </AnalysisCard>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 fade-in flex flex-col gap-y-6" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col flex-grow bg-transparent p-4 rounded-lg min-h-0">
                <h3 className="text-lg font-semibold text-cyber-primary mb-4 text-glow-subtle">Categories</h3>
                <div className="overflow-y-auto flex-grow custom-scrollbar" style={{ maxHeight: 'calc(100vh - 500px)' }}>
                   <CategoryLegend
                      data={memoizedData}
                      filter={filter}
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onMouseLeave}
                      onCategoryClick={handleCategoryClick}
                  />
                </div>
              </div>
              <div className="h-[280px] flex-shrink-0">
                <DifficultyAnalysis />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;