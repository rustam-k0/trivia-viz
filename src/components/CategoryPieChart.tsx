import { useState, useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import type { AggregationData } from '../types';

interface CategoryPieChartProps {
  data: AggregationData[];
  filter: string;
  setFilter: (filter: string) => void; 
  questionCount: number; 
}

const COLORS = ['#4CFF8C', '#6B66FF', '#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#FF8C4C', '#66FFD1', '#6BFF6B'];

// Увеличенное отображение выбранного сегмента
const ActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value }: any) => (
  <g>
    <text x={cx} y={cy - 20} textAnchor="middle" fill="#FFFFFF" fontSize="3.5rem" fontWeight="bold" className="text-shadow-glow">
      {value}
    </text>
    <text x={cx} y={cy + 40} textAnchor="middle" fill="#AAAAAA" fontSize="1.4rem">Questions</text>
    <text x={cx} y={cy + 75} textAnchor="middle" fill={fill} fontSize="1.3rem" fontWeight="semibold">{payload.name}</text>
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 15}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      style={{ filter: `drop-shadow(0 0 10px ${fill})` }}
    />
  </g>
);

// Центральный текст с общим числом вопросов
const CenterTotalText = ({ cx, cy, totalQuestions, currentFilter }: { cx: number, cy: number, totalQuestions: number, currentFilter: string }) => (
  <g>
    <text x={cx} y={cy - 10} textAnchor="middle" fill="#4CFF8C" fontSize="3.8rem" fontWeight="bold" className="text-shadow-glow">
      {totalQuestions}
    </text>
    <text x={cx} y={cy + 50} textAnchor="middle" fill="#AAAAAA" fontSize="1rem">
      {currentFilter === 'All Categories' ? 'TOTAL QUESTIONS' : 'QUESTIONS IN FILTER'}
    </text>
  </g>
);

export default function CategoryPieChart({ data, filter, setFilter, questionCount }: CategoryPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const sortedData = useMemo(() => [...data].sort((a, b) => b.count - a.count), [data]);

  const onPieEnter = useCallback((_: any, index: number) => setActiveIndex(index), []);
  const onMouseLeave = useCallback(() => setActiveIndex(null), []);

  const handleCategoryClick = useCallback((name: string) => {
    setFilter(name === filter ? 'All Categories' : name);
  }, [filter, setFilter]);

  if (!sortedData.length) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <div className="text-center text-accent text-4xl">∅</div>
        <p className="text-cyber-secondary">No Data Available for Current Filter</p>
      </div>
    );
  }

  const SIZE = 500;
  const center = SIZE / 2;
  const outerRadius = SIZE * 0.4;
  const innerRadius = outerRadius * 0.75;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-black mb-8 text-cyber-primary border-b border-border-primary pb-3">CATEGORY BREAKDOWN</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start flex-grow">
        <div className="w-full md:w-2/5 flex-shrink-0 relative" style={{ height: SIZE }}>
          <ResponsiveContainer key={filter} width="100%" height="100%">
            <PieChart>
              <CenterTotalText cx={center} cy={center} totalQuestions={questionCount} currentFilter={filter} />
              <Pie
                activeIndex={activeIndex ?? -1}
                activeShape={ActiveShape}
                data={sortedData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                paddingAngle={2}
                onMouseEnter={onPieEnter}
                onMouseLeave={onMouseLeave}
                onClick={(_, index) => handleCategoryClick(sortedData[index].name)}
              >
                {sortedData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#0D0D0D" strokeWidth={3} className="cursor-pointer" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-3/5 flex-grow">
          <div className="text-base text-cyber-secondary mb-4 uppercase font-semibold">Click category to filter</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {sortedData.map((item, i) => (
              <div
                key={item.name}
                className={`flex justify-between items-center py-2 px-1 cursor-pointer border-l-4 rounded-sm transition-all duration-200 ${
                  filter === item.name ? 'font-semibold bg-opacity-5' : 'border-transparent'
                }`}
                style={{
                  borderLeftColor: COLORS[i % COLORS.length],
                  backgroundColor: filter === item.name ? 'rgba(76, 255, 140, 0.08)' : 'transparent',
                }}
                onMouseEnter={() => onPieEnter(null, i)}
                onMouseLeave={onMouseLeave}
                onClick={() => handleCategoryClick(item.name)}
              >
                <div style={{ color: COLORS[i % COLORS.length], fontWeight: 'bold', marginRight: '0.5rem' }}>{item.count}</div>
                <p className="text-base" style={{ color: filter === item.name ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
