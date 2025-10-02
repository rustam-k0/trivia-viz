
interface CategorySelectorProps {
  categories: string[];
  currentFilter: string;
  setFilter: (filter: string) => void;
  questionCount: number;
}

export default function CategorySelector({ 
  categories, 
  currentFilter, 
  setFilter, 
  questionCount 
}: CategorySelectorProps) {
  return (
    <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
          <label 
            htmlFor="category-select" 
            className="text-lg font-bold text-gray-900 whitespace-nowrap"
          >
            Filter by Category
          </label>
          <select
            id="category-select"
            value={currentFilter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-96 bg-white border-2 border-gray-300 text-gray-900 text-base rounded-lg px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="text-center lg:border-l-2 lg:border-gray-200 lg:pl-10">
          <p className="text-6xl font-bold text-blue-600 mb-2">
            {questionCount}
          </p>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Total Questions
          </p>
        </div>
      </div>
    </div>
  );
}