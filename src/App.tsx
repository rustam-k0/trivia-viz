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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-modern py-12">
          <div className="fade-in">
            <h1 className="text-display text-gray-900 mb-4">
              Trivia Insights
            </h1>
            <p className="text-xl text-gray-600 font-medium max-w-2xl">
              Interactive data visualization of trivia questions from Open Trivia Database
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-modern py-12">
        {/* Filter Section */}
        <div className="fade-in mb-12">
          <CategorySelector
            categories={uniqueCategories}
            currentFilter={filter}
            setFilter={setFilter}
            questionCount={questionCount}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Category Chart */}
          <div className="xl:col-span-2 card p-8 fade-in">
            <div className="mb-6">
              <h2 className="text-title text-gray-900 mb-2">
                Category Distribution
              </h2>
              <p className="text-gray-600">Breakdown of questions by topic area</p>
            </div>
            <CategoryPieChart data={categoryData} />
          </div>

          {/* Difficulty Chart */}
          <div className="card p-8 fade-in">
            <div className="mb-6">
              <h2 className="text-title text-gray-900 mb-2">
                Difficulty Levels
              </h2>
              <p className="text-gray-600">Spread of question complexity</p>
            </div>
            <DifficultyBarChart data={difficultyData} />
          </div>
        </div>

        {/* Data Summary */}
        <div className="fade-in">
          <DataSummary
            totalCategories={uniqueCategories.length - 1}
            totalQuestions={totalQuestions}
            difficultyLevels={difficultyData.length}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container-modern py-8">
          <p className="text-center text-gray-600">
            Data sourced from <strong>Open Trivia Database</strong> • Built with modern web technologies
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;