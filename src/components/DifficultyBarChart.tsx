import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import type { AggregationData } from '../types';

interface DifficultyBarChartProps {
  data: AggregationData[];
}

const DifficultyBarChart: React.FC<DifficultyBarChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const getColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280"
          fontSize={14}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          allowDecimals={false} 
          stroke="#6b7280"
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          formatter={(value) => [`${value} questions`, 'Count']}
          contentStyle={{ 
            backgroundColor: '#ffffff', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            fontSize: '14px',
          }}
          cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
        />
        <Bar 
          dataKey="count" 
          radius={[4, 4, 0, 0]}
          maxBarSize={60}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DifficultyBarChart;