import React from 'react';
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Info, ShieldCheck } from 'lucide-react';

const data = [
  { name: 'Clarity', Teacher1: 8.5, Teacher2: 7.2, Teacher3: 9.0 },
  { name: 'Engagement', Teacher1: 9.2, Teacher2: 6.8, Teacher3: 8.4 },
  { name: 'Structure', Teacher1: 7.8, Teacher2: 8.5, Teacher3: 7.2 },
  { name: 'Vocab', Teacher1: 8.9, Teacher2: 7.4, Teacher3: 9.5 },
  { name: 'Coverage', Teacher1: 7.5, Teacher2: 9.1, Teacher3: 8.0 },
];

export default function Compare({ onLogout }) {
  return (
    <div className="flex bg-[#f9f9f8] min-h-screen">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1">
        <Navbar />
        
        <main className="max-w-[1400px] mx-auto px-10 pt-12">
          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Peer Comparison</h1>
              <p className="text-sm font-medium text-gray-500 mt-2">Compare performance benchmarks across different teaching profiles.</p>
            </div>
            <div className="flex gap-4">
               <div className="flex -space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-[#f9f9f8] bg-black flex items-center justify-center text-white text-xs font-bold shadow-lg">
                       T{i}
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Alert Info */}
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-[24px] flex items-start gap-4 mb-10">
             <Info className="text-blue-500 mt-1" size={24} />
             <div>
                <h4 className="font-bold text-blue-900 mb-1">Non-Ranking Framework</h4>
                <p className="text-xs text-blue-700/80 font-medium leading-relaxed">
                   This comparison is for professional development only. O-TEGS uses fair normalization to ensure 
                   variations in subject matter and student demographics are considered in every metric.
                </p>
             </div>
          </div>

          {/* Comparison Chart */}
          <div className="opti-card !p-10 mb-8">
            <h3 className="text-xl font-bold mb-10">Performance Distribution</h3>
            <div className="w-full h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f9f9f8' }} 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} 
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="Teacher1" fill="#2185f8" radius={[6, 6, 0, 0]} barSize={20} />
                  <Bar dataKey="Teacher2" fill="#f87d4c" radius={[6, 6, 0, 0]} barSize={20} />
                  <Bar dataKey="Teacher3" fill="#1a1a1a" radius={[6, 6, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="opti-card">
                <div className="flex items-center gap-2 mb-6">
                   <ShieldCheck className="text-emerald-500" size={20} />
                   <h4 className="font-bold">Growth Synergy Found</h4>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                   Teacher 1 and Teacher 3 show exceptional clarity in vocabulary. Peer-coaching between these 
                   individuals and Teacher 2 could improve campus-wide communication by 12%.
                </p>
             </div>
             <div className="opti-card">
                <div className="flex items-center gap-2 mb-6">
                   <Users className="text-blue-500" size={20} />
                   <h4 className="font-bold">Engagement Stability</h4>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                   Average engagement across the group is 8.1. All teachers are currently performing above the 
                   national benchmark for teacher-student interaction frequency.
                </p>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}