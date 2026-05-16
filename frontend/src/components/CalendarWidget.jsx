import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const exams = [
  { title: "Quarterly Exams 6A", date: "15 June, 2023", color: "orange" },
  { title: "Quarterly Exams 6A", date: "15 June, 2023", color: "green" },
  { title: "Quarterly Exams 6A", date: "15 June, 2023", color: "red" },
  { title: "Quarterly Exams 6A", date: "15 June, 2023", color: "blue" },
  { title: "Quarterly Exams 6A", date: "15 June, 2023", color: "purple" },
];

export default function CalendarWidget() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="glass-card h-full bg-white !p-0 overflow-hidden flex flex-col">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <ChevronLeft size={16} className="text-slate-400 cursor-pointer" />
          <h3 className="font-bold text-slate-800 text-sm">January, 2023</h3>
          <ChevronRight size={16} className="text-slate-400 cursor-pointer" />
        </div>
        
        <div className="grid grid-cols-7 gap-y-4 mb-6">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
            <span key={d} className="text-[10px] font-bold text-slate-400 text-center">{d}</span>
          ))}
          {days.map(d => (
            <span key={d} className={`text-[11px] font-semibold text-center p-1 cursor-pointer hover:bg-slate-50 rounded-lg ${d === 20 ? 'bg-primary/20 text-primary rounded-full' : 'text-slate-600'}`}>
              {d}
            </span>
          ))}
        </div>

        <button className="w-full py-2.5 bg-primary text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="flex-1 bg-slate-50/50 p-6 space-y-4">
        {exams.map((ex, i) => (
          <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
            <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: ex.color }} />
            <div>
              <p className="text-xs font-bold text-slate-800">{ex.title}</p>
              <p className="text-[10px] text-slate-400 font-medium">{ex.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
