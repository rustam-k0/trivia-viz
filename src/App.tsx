// src/App.tsx

import React from 'react';
import { useTriviaData } from './hooks/useTriviaData';
import Loading from './components/Loading';
import ErrorState from './components/ErrorState';
import CategoryPieChart from './components/CategoryPieChart';
import DifficultyBarChart from './components/DifficultyBarChart';

const PADDING_CLASSES = "px-10 sm:px-20 lg:px-48 max-w-full mx-auto";

const App: React.FC = () => {
  const {
    isLoading,
    error,
    filter,
    setFilter,
    categoryData,
    difficultyData,
    questionCount,
  } = useTriviaData();

  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={error} />;


  return (
    <>
      <div className="cyber-bg" />
      <div className="min-h-screen pb-16">
        <header className={`py-8 relative fade-in ${PADDING_CLASSES}`}>
          <h1 className="text-5xl md:text-7xl font-black tracking-widest text-shadow-glow">
            TRIVIEW
          </h1>
          <p className="text-xl text-text-secondary mt-1">
            Interactive trivia data visualization
          </p>
        </header>

        <main className={`mt-8 ${PADDING_CLASSES}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 fade-in min-h-[500px]" style={{ animationDelay: '0.2s' }}>
              <CategoryPieChart
                data={categoryData}
                filter={filter}
                setFilter={setFilter}
                questionCount={questionCount}
              />
            </div>

            <div className="lg:col-span-1 flex flex-col gap-6 fade-in" style={{ animationDelay: '0.4s' }}>
              <div>
                <h2 className="text-2xl font-black mb-4 text-text-primary border-b border-border-primary pb-2">DIFFICULTY</h2>
                <DifficultyBarChart data={difficultyData} />
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
};

export default App;