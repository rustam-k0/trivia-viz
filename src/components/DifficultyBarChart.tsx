import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import type { AggregationData } from '../types';

interface DifficultyBarChartProps {
  data: AggregationData[];
}

const DifficultyBarChart: React.FC<DifficultyBarChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center cyber-fade-in">
          <div className="w-12 h-12 border-2 border-cyber rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-accent text-xl">∅</span>
          </div>
          <div className="text-caption text-cyber-secondary mb-2">NO DATA</div>
          <div className="text-body text-cyber-secondary">Insufficient dataset</div>
        </div>
      </div>
    );
  }

  const getCyberColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#4CFF8C';
      case 'medium': return '#FFD166';
      case 'hard': return '#FF6B6B';
      default: return '#6B66FF';
    }
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="2 2" stroke="var(--border-primary)" vertical={false} />
        <XAxis 
          dataKey="name" 
          stroke="var(--text-secondary)"
          fontSize="10px"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 1)}
        />
        <YAxis 
          allowDecimals={false} 
          stroke="var(--text-secondary)"
          fontSize="10px"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          formatter={(value) => [`${value}`, '']}
          labelFormatter={(label) => label.toUpperCase()}
          contentStyle={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-primary)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '11px',
            backdropFilter: 'blur(10px)',
          }}
          cursor={{ fill: 'rgba(76, 255, 140, 0.1)' }}
        />
        <Bar 
          dataKey="count" 
          radius={[3, 3, 0, 0]}
          maxBarSize={35}
          animationBegin={300}
          animationDuration={800}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={getCyberColor(entry.name)}
              stroke="var(--bg-primary)"
              strokeWidth={1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DifficultyBarChart;