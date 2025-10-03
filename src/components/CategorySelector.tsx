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
    <div className="cyber-panel p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <label className="block text-cyber-primary mb-2">CATEGORY FILTER</label>
          <select
            value={currentFilter}
            onChange={(e) => setFilter(e.target.value)}
            className="cyber-select w-full md:w-64"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="cyber-metric px-4 py-3 min-w-[120px] text-center">
          <p className="text-title text-accent">{questionCount}</p>
          <p className="text-caption text-cyber-secondary">QUESTIONS</p>
        </div>
      </div>
    </div>
  );
}