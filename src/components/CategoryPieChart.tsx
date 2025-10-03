import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { AggregationData } from '../types';

interface CategoryPieChartProps {
  data: AggregationData[];
}

const COLORS = ['#4CFF8C', '#FF6B6B', '#6B66FF', '#FFD166', '#06D6A0'];

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const chartData = data.filter(d => d.count > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-accent text-xl mb-2">∅</div>
          <div className="text-cyber-secondary">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          label={({ percent }) => percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}