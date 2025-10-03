import React from 'react';
import { useTriviaData } from './hooks/useTriviaData';
import Loading from './components/Loading';
import ErrorState from './components/ErrorState';
import CategorySelector from './components/CategorySelector';
import CategoryPieChart from './components/CategoryPieChart';
import DifficultyBarChart from './components/DifficultyBarChart';

const App: React.FC = () => {
  const {
    isLoading,
    error,
    filter,
    setFilter,
    categoryData,
    difficultyData,
    uniqueCategories,
    questionCount,
  } = useTriviaData();

  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-cyber-primary">
      <header className="border-b border-cyber py-6">
        <div className="cyber-container">
          <h1 className="text-display text-cyber-primary mb-2">
            TRIVIA VISUALIZER
          </h1>
          <p className="text-body text-cyber-secondary">
            Data visualization from Open Trivia DB
          </p>
        </div>
      </header>

      <main className="cyber-container py-6">
        <div className="mb-6">
          <CategorySelector
            categories={uniqueCategories}
            currentFilter={filter}
            setFilter={setFilter}
            questionCount={questionCount}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="cyber-card p-4">
            <h2 className="text-title text-cyber-primary mb-2">BY CATEGORY</h2>
            <CategoryPieChart data={categoryData} />
          </div>

          <div className="cyber-card p-4">
            <h2 className="text-title text-cyber-primary mb-2">BY DIFFICULTY</h2>
            <DifficultyBarChart data={difficultyData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;