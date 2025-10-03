import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { AggregationData } from '../types';

interface CategoryPieChartProps {
  data: AggregationData[];
}

const CYBER_COLORS = ['#4CFF8C', '#FF6B6B', '#6B66FF', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#073B4C'];

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const chartData = data.filter(d => d.count > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-cyber rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-accent text-2xl">∅</span>
          </div>
          <div className="text-caption text-cyber-secondary mb-2">NO DATA STREAMS DETECTED</div>
          <div className="text-body text-cyber-secondary">Filter parameters yield zero results</div>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={60}
          paddingAngle={2}
          label={({ name, percent }) => 
            percent > 0.03 ? `${(percent * 100).toFixed(0)}%` : ''
          }
          labelLine={false}
        >
          {chartData.map((_entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={CYBER_COLORS[index % CYBER_COLORS.length]}
              stroke="var(--bg-primary)"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [`${value}`, 'COUNT']}
          labelFormatter={(label) => label.toUpperCase()}
          contentStyle={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '12px',
          }}
        />
        <Legend 
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{
            paddingLeft: '20px',
            fontSize: '11px',
            color: 'var(--text-primary)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}