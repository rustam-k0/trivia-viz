import React from 'react';
import { useTriviaData } from './hooks/useTriviaData';
import Loading from './components/Loading';
import ErrorState from './components/ErrorState';
import CategorySelector from './components/CategorySelector';
import CategoryPieChart from './components/CategoryPieChart';
import DifficultyBarChart from './components/DifficultyBarChart';
import DataSummary from './components/DataSummary';

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
    totalQuestions,
  } = useTriviaData();

  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-cyber-primary relative">
      {/* Animated Background Elements */}
      <div className="cyber-bg"></div>
      <div className="cyber-grid"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-cyber py-6 lg:py-8">
          <div className="cyber-container">
            <div className="cyber-fade-in">
              <h1 className="text-display text-cyber-primary mb-2 lg:mb-4 cyber-glitch" data-text="TRIVIA.AI">
                TRIVIA<span className="text-accent">.</span>AI
              </h1>
              <p className="text-body text-cyber-secondary max-w-2xl">
                Advanced data visualization engine
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="cyber-container py-6 lg:py-8">
          {/* Control Interface */}
          <div className="cyber-fade-in mb-6 lg:mb-8" style={{animationDelay: '0.1s'}}>
            <CategorySelector
              categories={uniqueCategories}
              currentFilter={filter}
              setFilter={setFilter}
              questionCount={questionCount}
            />
          </div>

          {/* Visualization Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Primary Data Visualization */}
            <div className="xl:col-span-2 cyber-card p-4 lg:p-6 cyber-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="mb-4 lg:mb-6">
                <h2 className="text-title text-cyber-primary mb-1 lg:mb-2">
                  DOMAIN ANALYSIS
                </h2>
                <p className="text-caption text-cyber-secondary">
                  Knowledge distribution patterns
                </p>
              </div>
              <CategoryPieChart data={categoryData} />
            </div>

            {/* Secondary Metrics */}
            <div className="cyber-card p-4 lg:p-6 cyber-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="mb-4 lg:mb-6">
                <h2 className="text-title text-cyber-primary mb-1 lg:mb-2">
                  COMPLEXITY MATRIX
                </h2>
                <p className="text-caption text-cyber-secondary">
                  Difficulty spectrum
                </p>
              </div>
              <DifficultyBarChart data={difficultyData} />
            </div>
          </div>

          {/* System Metrics */}
          <div className="cyber-fade-in" style={{animationDelay: '0.4s'}}>
            <DataSummary
              totalCategories={uniqueCategories.length - 1}
              totalQuestions={totalQuestions}
              difficultyLevels={difficultyData.length}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-cyber mt-8 lg:mt-12 py-4 lg:py-6">
          <div className="cyber-container">
            <p className="text-caption text-cyber-secondary text-center">
              SYSTEM ACTIVE • SOURCE: OPEN TRIVIA DB • v2.1.0
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;