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
    <div className="card p-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex-1">
          <label 
            htmlFor="category-select" 
            className="block text-lg font-semibold text-gray-900 mb-3"
          >
            Filter by Category
          </label>
          <select
            id="category-select"
            value={currentFilter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full lg:w-80 bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="text-center lg:text-right">
          <div className="bg-blue-50 rounded-lg p-4 min-w-[120px]">
            <p className="text-2xl font-bold text-blue-600">
              {questionCount}
            </p>
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mt-1">
              Questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}