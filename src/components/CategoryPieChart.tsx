import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { AggregationData } from '../types';

interface CategoryPieChartProps {
  data: AggregationData[];
}

const COLORS = ['#0072CE', '#00A3E0', '#F39200', '#8CC63F', '#005EB8', '#00B8D4', '#FFA726', '#66BB6A'];

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  // Преобразуем в ChartDataInput
  const chartData = data
    .filter(d => d.count > 0)
    .map(d => ({ name: d.name, count: d.count }));

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        <p style={{ fontFamily: 'Inter, sans-serif' }}>No data available for current filter</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          label={({ name, percent }: any) => `${name.substring(0, 20)} (${(percent * 100).toFixed(0)}%)`}
          labelLine
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px'
          }}
        />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}