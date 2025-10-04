
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import type { AggregationData } from '../types';

interface DifficultyBarChartProps {
  data: AggregationData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="cyber-panel p-3">
        <p className="font-bold">{label}</p>
        <p className="text-accent">{`Questions: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const DifficultyBarChart = ({ data }: DifficultyBarChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-cyber-secondary">No data to display.</p>
      </div>
    );
  }

  const getColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#4CFF8C';
      case 'medium': return '#FFD166';
      case 'hard': return '#FF6B6B';
      default: return '#6B66FF';
    }
  };

  return (
    // ✅ ИЗМЕНЕНО: Уменьшение высоты на 30% (300px -> 210px)
    <ResponsiveContainer width="%" height={300}> 
      <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <defs>
          {data.map((entry, index) => (
            <linearGradient key={`gradient-${index}`} id={`color-${entry.name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={getColor(entry.name)} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={getColor(entry.name)} stopOpacity={0.2}/>
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
        <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)' }} stroke="var(--border-primary)" />
        <YAxis tick={{ fill: 'var(--text-secondary)' }} stroke="var(--border-primary)" />
        <Tooltip cursor={{ fill: 'rgba(64, 48, 76, 0.3)' }} content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={`url(#color-${entry.name})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DifficultyBarChart;