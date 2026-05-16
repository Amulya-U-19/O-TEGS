import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Clarity', T1: 8, T2: 6, T3: 9 },
  { name: 'Engage', T1: 9, T2: 7, T3: 8 },
  { name: 'Vocab', T1: 7, T2: 9, T3: 7 },
];

export default function TeacherComparisonWidget() {
  return (
    <div className="opti-card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Teacher Benchmark</h3>
        <span className="text-[10px] font-bold text-gray-400">vs Peers</span>
      </div>
      
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
               itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
            />
            <Bar dataKey="T1" fill="#2185f8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="T2" fill="#f87d4c" radius={[4, 4, 0, 0]} />
            <Bar dataKey="T3" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-between items-center">
         <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-black"></div>
         </div>
         <span className="text-[10px] font-bold text-gray-400 italic">3 Teacher Profiled</span>
      </div>
    </div>
  );
}
