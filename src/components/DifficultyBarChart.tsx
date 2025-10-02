import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import type { AggregationData } from '../types';

interface DifficultyBarChartProps {
  data: AggregationData[];
}

const DifficultyBarChart: React.FC<DifficultyBarChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        <p style={{ fontFamily: 'Inter, sans-serif' }}>No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E6E6E6" />
        <XAxis 
          dataKey="name" 
          stroke="#333333"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', textTransform: 'capitalize' }}
        />
        <YAxis 
          allowDecimals={false} 
          stroke="#333333"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E6E6E6',
            borderRadius: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#111111'
          }}
          cursor={{ fill: 'rgba(230, 230, 230, 0.3)' }}
        />
        <Bar 
          dataKey="count" 
          fill="#0072CE" 
          radius={[6, 6, 0, 0]}
          maxBarSize={80}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DifficultyBarChart;