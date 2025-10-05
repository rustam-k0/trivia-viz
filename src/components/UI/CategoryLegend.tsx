import React from 'react';

interface EnrichedCategoryData {
  name: string;
  count: number;
  color: string;
}

interface CategoryLegendProps {
  data: EnrichedCategoryData[];
  filter: string;
  onMouseEnter: (_: any, index: number) => void;
  onMouseLeave: () => void;
  onCategoryClick: (name: string) => void;
}

const CategoryLegend: React.FC<CategoryLegendProps> = ({ data, filter, onMouseEnter, onMouseLeave, onCategoryClick }) => {
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="w-full flex-grow">
      <div className="flex flex-col gap-y-1 sm:gap-y-2">
        {sortedData.map((item, i) => {
          const isActive = filter === item.name;

          return (
            <div
              key={item.name}
              className={`flex items-center w-full rounded transition-all duration-150 cursor-pointer
                ${isActive ? '' : 'hover:bg-[#374151]'}`
              }
              onMouseEnter={() => onMouseEnter(null, i)}
              onMouseLeave={onMouseLeave}
              onClick={() => onCategoryClick(item.name)}
            >
              <div className="flex justify-between items-center w-full py-1.5 px-2">
                <div className="flex items-center gap-x-3 flex-grow min-w-0">
                  <div
                    style={{ color: item.color }}
                    className="text-base sm:text-lg font-bold w-6 sm:w-7 text-center"
                  >
                    {item.count}
                  </div>
                  <p className="text-base sm:text-lg font-normal text-[#E5E7EB] truncate">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryLegend;