import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Present', value: 74 },
  { name: 'Absent', value: 26 },
];

const COLORS = ['#2185f8', '#e2e8f0'];

export default function AttendanceDonut() {
  return (
    <div className="glass-card flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <h3 className="font-semibold text-slate-800">Attendance Overview</h3>
        <select className="text-xs bg-slate-50 border border-slate-200 rounded p-1 outline-none">
          <option>Class 6B</option>
        </select>
      </div>
      <div className="relative w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold">74%</span>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-xs text-slate-500">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
          <span className="text-xs text-slate-500">Absent</span>
        </div>
      </div>
      <div className="w-full mt-4 text-center">
        <p className="text-xs font-semibold text-slate-400">Total : 65</p>
      </div>
    </div>
  );
}
