import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import type { DifficultyData } from '../../types';
import { COLORS } from '../../config/constants'; // ИМПОРТ для консистентности

interface DifficultyBarChartProps {
  data: DifficultyData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border-primary p-3 rounded-md shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-text-secondary">{`Questions: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const DifficultyBarChart: React.FC<DifficultyBarChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-text-secondary">No data to display.</p>
      </div>
    );
  }

  const difficultyColors = {
    easy: COLORS[0],      // Техно-зеленый
    medium: COLORS[5],    // Янтарный
    hard: COLORS[3],      // Малиновый
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="color-easy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={difficultyColors.easy} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={difficultyColors.easy} stopOpacity={0.2}/>
          </linearGradient>
          <linearGradient id="color-medium" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={difficultyColors.medium} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={difficultyColors.medium} stopOpacity={0.2}/>
          </linearGradient>
          <linearGradient id="color-hard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={difficultyColors.hard} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={difficultyColors.hard} stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#343a40" />
        <XAxis dataKey="name" tick={{ fill: '#adb5bd' }} stroke="#343a40" />
        <YAxis tick={{ fill: '#adb5bd' }} stroke="#343a40" />
        <Tooltip cursor={{ fill: 'rgba(95, 117, 230, 0.1)' }} content={<CustomTooltip />} />
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