// src/components/Charts/DifficultyBarChart.tsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from 'recharts';
import type { DifficultyData } from '../../types';
import { COLORS } from '../../config/constants';

interface DifficultyBarChartProps {
  data: DifficultyData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-2 rounded shadow">
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
    easy: COLORS[0],
    medium: COLORS[5],
    hard: COLORS[3],
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 5 }} barCategoryGap="25%">
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
        <XAxis dataKey="name" tick={{ fill: '#adb5bd', fontSize: 12 }} stroke="#343a40" />
        <YAxis tick={{ fill: '#adb5bd', fontSize: 12 }} stroke="#343a40" />
        <Tooltip cursor={{ fill: 'rgba(95, 117, 230, 0.1)' }} content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          <LabelList dataKey="count" position="top" style={{ fill: '#E5E7EB', fontSize: 12 }} />
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={`url(#color-${entry.name})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DifficultyBarChart;