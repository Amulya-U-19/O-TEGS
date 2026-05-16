import React from 'react';
import { Calendar, Phone, Activity, Search, Sparkles, MoreVertical } from 'lucide-react';

const operations = [
  { icon: Search, title: "Process Review", time: "10:00 AM", color: "#f1f1f0" },
  { icon: Activity, title: "Metric Sync", time: "11:30 AM", color: "#f1f1f0" },
  { icon: Sparkles, title: "AI Insights", time: "01:00 PM", color: "#f1f1f0" },
  { icon: Phone, title: "Coaching Call", time: "02:30 PM", color: "#f1f1f0" },
];

export default function OperationsPanel() {
  return (
    <div className="opti-card">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-900">Upcoming Operations</h3>
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-white transition-all">
          <Calendar size={16} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-8 px-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">{d}</span>
            <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full ${i === 4 ? 'bg-black text-white' : 'text-gray-900'}`}>{3 + i}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {operations.map((op, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-black transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-black group-hover:text-white transition-all">
                <op.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{op.title}</p>
                <p className="text-[10px] text-gray-500 font-medium">{op.time}</p>
              </div>
            </div>
            <MoreVertical size={16} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
