import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { AggregationData } from '../types';

interface DifficultyBarChartProps {
  data: AggregationData[];
}

const DifficultyBarChart = ({ data }: DifficultyBarChartProps) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-accent text-xl mb-2">∅</div>
          <div className="text-cyber-secondary">No data available</div>
        </div>
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
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" radius={[3, 3, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DifficultyBarChart;