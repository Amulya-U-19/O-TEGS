import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Class 6 A', score: 67, color: '#f87d4c' },
  { name: 'Class 6 B', score: 67, color: '#f87d4c' },
  { name: 'Class 7 A', score: 67, color: '#2185f8' },
  { name: 'Class 9 C', score: 67, color: '#2185f8' },
  { name: 'Class 9 D', score: 67, color: '#0ea5e9' },
  { name: 'Class 10 A', score: 67, color: '#0ea5e9' },
];

export default function PerformanceBars() {
  return (
    <div className="glass-card">
      <div className="flex justify-between w-full mb-6">
        <h3 className="font-semibold text-slate-800">Students Performance</h3>
        <select className="text-xs bg-slate-50 border border-slate-200 rounded p-1 outline-none">
          <option>Passing</option>
        </select>
      </div>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: -20, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fontWeight: 500, fill: '#64748b' }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={8}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
