// src/components/Charts/CategoryPieChart.tsx

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import type { CategoryData } from '../../types';

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  const shapeColor = payload.color; 

  return (
    <g>
      <text x={cx} y={cy - 20} textAnchor="middle" fill="#FFFFFF" fontSize="4rem" fontWeight="bold" className="text-shadow-glow">{value}</text>
      <text x={cx} y={cy + 40} textAnchor="middle" fill="#AAAAAA" fontSize="1.4rem">Questions</text>
      <text x={cx} y={cy + 75} textAnchor="middle" fill={shapeColor} fontSize="1.3rem" fontWeight="semibold">{payload.name}</text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius} outerRadius={outerRadius + 15}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill} style={{ filter: `drop-shadow(0 0 10px ${shapeColor})` }}
      />
    </g>
  );
};

type EnrichedCategoryData = CategoryData & { color: string; };

interface CategoryPieChartProps {
  data: EnrichedCategoryData[];
  questionCount: number;
  filter: string;
  activeIndex: number | null;
  onPieEnter: (_: any, index: number) => void;
  onMouseLeave: () => void;
  onCategoryClick: (name: string) => void;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = (props) => {
  const { data, questionCount, filter, activeIndex, onPieEnter, onMouseLeave, onCategoryClick } = props;

  const isFiltered = filter !== 'All';
  const NEUTRAL_COLOR = '#FFFFFF';

  const centerTextColor = isFiltered 
    ? data.find(d => d.name === filter)?.color ?? NEUTRAL_COLOR 
    : NEUTRAL_COLOR;
  
  const centerLabel = isFiltered ? 'QUESTIONS IN FILTER' : 'TOTAL QUESTIONS';

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[450px]">
        <div className="text-center">
          <p className="text-text-secondary text-lg">No Data Available</p>
        </div>
      </div>
    );
  }

  const SIZE = 550;
  const outerRadius = 220;
  const innerRadius = 130;

  return (
    <div className="w-full h-full relative" style={{ minWidth: SIZE, minHeight: SIZE }}>
      <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200 ${activeIndex !== null ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-shadow-glow text-6xl font-bold" style={{ color: centerTextColor }}>{questionCount}</div>
        <div className="text-[#AAAAAA] text-base mt-2">{centerLabel}</div>
        {isFiltered && (<div className="font-semibold text-lg mt-4" style={{ color: centerTextColor }}>{filter}</div>)}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex ?? -1}
            activeShape={renderActiveShape}
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%" cy="50%"
            outerRadius={outerRadius} innerRadius={innerRadius}
            paddingAngle={4}
            onMouseEnter={onPieEnter} onMouseLeave={onMouseLeave}
            onClick={(_, index) => onCategoryClick(data[index].name)}
          >
            {data.map(entry => (
              <Cell 
                key={`cell-${entry.name}`} 
                fill={entry.color}
                stroke="#0D0D0D" strokeWidth={3}
                className="cursor-pointer focus:outline-none transition-opacity duration-200 hover:opacity-80"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;