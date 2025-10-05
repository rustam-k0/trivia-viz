import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Layout/Header';
import { useTrivia } from './context/TriviaContext';
import { getColorForCategory } from './utils/colorManager';

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
      <div className="min-h-screen pb-8">
        <Header />

        <main className="px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 min-h-[500px]">
            <div className="lg:col-span-2 fade-in flex flex-col">
              <div className="flex flex-col flex-grow bg-transparent rounded-lg">
                <div className="mb-4 sm:mb-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-semibold text-cyber-primary text-glow-subtle">Category Distribution</h3>
                </div>
                <div className="flex-grow flex flex-col items-center justify-start">
                  {filter !== 'All' && (
                    <div className="w-full flex justify-center mb-3 sm:mb-4 px-2">
                      <div className="bg-[#1F2937] rounded-lg py-2 px-3 flex items-center justify-between w-full max-w-md gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-gray-300 text-sm sm:text-base whitespace-nowrap flex-shrink-0">Filtered by:</span>
                          <span className="font-semibold text-white truncate flex-1">{filter}</span>
                        </div>
                        <button 
                          onClick={handleClearFilter} 
                          className="bg-[#374151] hover:bg-gray-600 text-gray-300 text-sm sm:text-base py-1 px-2 sm:px-3 rounded transition-colors duration-150 focus:outline-none border whitespace-nowrap flex-shrink-0"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] -mt-4 sm:-mt-6">
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
                  <div className="w-full max-w-[600px] mt-4 sm:mt-6 md:mt-8 h-[200px] sm:h-[250px]">
                    <DifficultyAnalysis />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 fade-in flex flex-col" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col flex-grow bg-transparent rounded-lg">
                <div className="mb-4 sm:mb-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-semibold text-cyber-primary text-glow-subtle">Categories</h3>
                  <p className="text-gray-400 text-sm sm:text-xl">Click to filter</p>
                </div>
                <div className="overflow-y-auto flex-grow custom-scrollbar pr-2 max-h-[400px] sm:max-h-none">
                  <CategoryLegend
                    data={memoizedData}
                    filter={filter}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onMouseLeave}
                    onCategoryClick={handleCategoryClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;