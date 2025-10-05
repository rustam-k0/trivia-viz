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
      setTimeout(() => setIgnoreHover(false), 150);
    }
  }, [filter, setFilter]);

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

            <div className="lg:col-span-1 fade-in flex flex-col" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col flex-grow bg-transparent rounded-lg">
                <div className="mb-4 sm:mb-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-semibold text-cyber-primary text-glow-subtle">Categories</h3>
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