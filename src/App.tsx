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
  const [ignoreHover, setIgnoreHover] = useState(false);

  const memoizedData = useMemo(() => {
    return categoryData.map(d => ({
      ...d,
      color: getColorForCategory(d.name),
    }));
  }, [categoryData]);

  const onPieEnter = useCallback((_: any, index: number) => { 
    if (!ignoreHover) setActiveIndex(index); 
  }, [ignoreHover]);

  const onMouseLeave = useCallback(() => { setActiveIndex(null); }, []);
  
  const handleCategoryClick = useCallback((name: string) => {
    const wasFiltered = filter === name;
    setFilter(prevFilter => (name === prevFilter ? 'All' : name));
    
    if (wasFiltered) {
      setIgnoreHover(true);
      setTimeout(() => setIgnoreHover(false), 300);
    }
  }, [filter, setFilter]);

  const handleClearFilter = useCallback(() => {
    setFilter('All');
  }, [setFilter]);

  const totalQuestions = useMemo(() =>
    categoryData.reduce((sum, item) => sum + item.count, 0),
    [categoryData]
  );

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  return (
    <>
      <div className="cyber-bg" />
      <div className="min-h-screen pb-16">
        <Header />

        <main className="px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[600px]">
            <div className="lg:col-span-2 fade-in flex flex-col">
              <AnalysisCard title="Category Distribution">
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                  {filter !== 'All' && (
                    <div className="w-full flex justify-center mb-4">
                      <div className="bg-[#1F2937] rounded-lg py-2 px-3 flex items-center justify-between">
                        <span className="text-gray-300 text-xl">Filtered by: <span className="font-semibold text-white ml-3">{filter}</span></span>
                        <button 
                          onClick={handleClearFilter} 
                          className="ml-3 bg-[#374151] hover:bg-gray-600 text-gray-300 text-xl py-1 px-2 rounded transition-colors duration-150 focus:outline-none border"
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
                </div>
              </AnalysisCard>
            </div>

            <div className="lg:col-span-1 fade-in flex flex-col gap-4" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col flex-grow bg-transparent rounded-lg">
                <div className="mb-3">
                  <h3 className="text-2xl font-semibold text-cyber-primary text-glow-subtle">Categories</h3>
                  <p className="text-gray-400 text-xl">Click to filter</p>
                </div>
                <div className="overflow-y-auto flex-grow custom-scrollbar pr-2">
                  <CategoryLegend
                    data={memoizedData}
                    filter={filter}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onMouseLeave}
                    onCategoryClick={handleCategoryClick}
                  />
                </div>
              </div>
              
              <div className="h-[300px]">
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