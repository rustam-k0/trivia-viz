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
      <header className="bg-white border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-3">
            Trivia Knowledge Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Data-driven insights from Open Trivia Database
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <CategorySelector
          categories={uniqueCategories}
          currentFilter={filter}
          setFilter={setFilter}
          questionCount={questionCount}
        />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 mt-16">
          <div className="xl:col-span-3 bg-white p-10 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
              Distribution by Category
            </h2>
            <CategoryPieChart data={categoryData} />
          </div>
          
          <div className="xl:col-span-2 bg-white p-10 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
              Distribution by Difficulty
            </h2>
            <DifficultyBarChart data={difficultyData} />
          </div>
        </div>

        <DataSummary
          totalCategories={uniqueCategories.length - 1}
          totalQuestions={totalQuestions}
          difficultyLevels={difficultyData.length}
        />
      </main>

      <footer className="bg-white border-t-2 border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <p className="text-sm text-gray-500 text-center">
            Data sourced from Open Trivia Database API â€¢ Designed in WEF style
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;