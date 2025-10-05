// src/components/UI/CategoryLegend.tsx

import React, { useState } from 'react';

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

const CategoryLegend: React.FC<CategoryLegendProps> = (props) => {
  const { data, filter, onMouseEnter, onMouseLeave, onCategoryClick } = props;
  const [ignoreHover, setIgnoreHover] = useState(false);
  
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  const handleClick = (name: string) => {
    const wasFiltered = filter === name;
    onCategoryClick(name);
    if (wasFiltered) {
      setIgnoreHover(true);
      setTimeout(() => setIgnoreHover(false), 300);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!ignoreHover) onMouseEnter(null, index);
  };

  return (
    <div className="w-full flex-grow">
      <div className="flex flex-col gap-y-2.5">
        {sortedData.map((item) => {
          const originalIndex = data.findIndex(d => d.name === item.name);
          const isActive = filter === item.name;

          return (
            <div
              key={item.name}
              className={`flex items-center w-full rounded-md transition-all duration-150 cursor-pointer focus:outline-none
                ${isActive 
                  ? 'bg-[#374151] ring-2 ring-[#14B8A6]' 
                  : 'hover:bg-[#374151]'
                }`
              }
              onMouseEnter={() => handleMouseEnter(originalIndex)}
              onMouseLeave={onMouseLeave}
              onClick={() => handleClick(item.name)}
            >
              <div className="flex justify-between items-center w-full py-1.5 px-2">
                <div className="flex items-center gap-x-4 flex-grow min-w-0">
                  <div 
                    style={{ color: item.color }} 
                    className="text-2xl font-bold w-10 text-center"
                  >
                    {item.count}
                  </div>
                  <p className="text-[15px] font-normal text-[#E5E7EB] leading-relaxed">
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