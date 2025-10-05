import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import type { CategoryData } from '../../types';

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  const shapeColor = payload.color;

  return (
    <g>
      <text x={cx} y={cy - 15} textAnchor="middle" fill="#FFFFFF" fontSize="3.5rem" fontWeight="bold" className="text-shadow-glow">{value}</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fill="#AAAAAA" fontSize="1.2rem">Questions</text>
      <text x={cx} y={cy + 60} textAnchor="middle" fill={shapeColor} fontSize="1.1rem" fontWeight="semibold">{payload.name}</text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius} outerRadius={outerRadius + 10}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill} style={{ filter: `drop-shadow(0 0 8px ${shapeColor})` }}
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
      <div className="flex items-center justify-center h-full w-full min-h-[500px]">
        <div className="text-center">
          <p className="text-text-secondary text-lg">No Data Available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px]">
      <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200 ${activeIndex !== null ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-shadow-glow text-5xl font-bold" style={{ color: centerTextColor }}>{questionCount}</div>
        <div className="text-[#AAAAAA] text-sm mt-1">{centerLabel}</div>
        {isFiltered && (<div className="font-semibold text-base mt-2" style={{ color: centerTextColor }}>{filter}</div>)}
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
            outerRadius={300} innerRadius={180}
            paddingAngle={2}
            onMouseEnter={onPieEnter} onMouseLeave={onMouseLeave}
            onClick={(_, index) => onCategoryClick(data[index].name)}
          >
            {data.map(entry => (
              <Cell
                key={`cell-${entry.name}`}
                fill={entry.color}
                stroke="#0D0D0D" strokeWidth={2}
                className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;