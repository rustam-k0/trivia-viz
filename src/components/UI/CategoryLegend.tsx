// src/components/UI/CategoryLegend.tsx

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

const CategoryLegend: React.FC<CategoryLegendProps> = (props) => {
  const { data, filter, onMouseEnter, onMouseLeave, onCategoryClick } = props;

  return (
    <div className="w-full md:w-3/5 flex-grow">
      <div className="text-base text-cyber-secondary mb-4 uppercase font-semibold">
        Click category to filter
      </div>
      <div className="flex flex-col gap-y-3">
        {data.map((item, i) => {
          const isActive = filter === item.name;
          const itemColor = item.color; // <-- Цвет берется напрямую из props

          return (
            <div
              key={item.name}
              className={`flex items-center w-full border-l-4 rounded-sm ${isActive ? 'font-semibold' : 'border-transparent'}`}
              style={{ borderLeftColor: isActive ? itemColor : 'transparent' }}
            >
              <div
                className="flex justify-between items-center w-fit py-2 px-3 cursor-pointer transition-all duration-200"
                style={{ backgroundColor: isActive ? 'rgba(95, 117, 230, 0.08)' : 'transparent' }}
                onMouseEnter={() => onMouseEnter(null, i)}
                onMouseLeave={onMouseLeave}
                onClick={() => onCategoryClick(item.name)}
              >
                <div className="flex items-center flex-grow min-w-0">
                  <div style={{ color: itemColor, fontWeight: 'bold', marginRight: '0.75rem' }}>
                    {item.count}
                  </div>
                  <p className="text-base" style={{ color: isActive ? '#b0b8ff' : '#FFFFFF' }}>
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