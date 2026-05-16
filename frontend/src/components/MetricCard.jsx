import React from 'react';
import { ChevronRight, TrendingUp, Zap, Clock, BarChart3 } from 'lucide-react';

export default function MetricCard({ title, value, change, icon: Icon, color }) {
  return (
    <div className="opti-card group hover:border-black transition-all cursor-pointer">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</span>
        <ChevronRight size={14} className="text-gray-400 group-hover:text-black" />
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">{value}</h2>
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-emerald-600">{change}</span>
            <span className="text-[11px] font-medium text-gray-400">vs last 4 month</span>
          </div>
        </div>
        
        <div className={`p-3 rounded-2xl bg-gray-50 group-hover:scale-110 transition-transform`} style={{ backgroundColor: `${color}15` }}>
           <Icon size={24} style={{ color: color }} />
        </div>
      </div>
    </div>
  );
}