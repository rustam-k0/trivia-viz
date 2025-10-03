import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { AggregationData } from '../types';

interface CategoryPieChartProps {
  data: AggregationData[];
}

const COLORS = ['#2563eb', '#059669', '#dc2626', '#7c3aed', '#ea580c', '#0891b2', '#65a30d', '#475569'];

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const chartData = data.filter(d => d.count > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600">No data available for current filter</p>
        </div>
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
          innerRadius={70}
          paddingAngle={2}
          label={({ name, percent }) => 
            percent > 0.03 ? `${(percent * 100).toFixed(0)}%` : ''
          }
          labelLine={false}
        >
          {chartData.map((_entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [`${value} questions`, 'Count']}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Legend 
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{
            paddingLeft: '20px',
            fontSize: '14px',
          }}
          formatter={(value) => <span className="text-gray-700">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}