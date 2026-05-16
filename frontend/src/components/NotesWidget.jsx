import React from 'react';
import { Plus } from 'lucide-react';

const notes = [
  { title: "Prepare Questions for Unit Test", date: "5 December, 2023" },
  { title: "Prepare Questions for Unit Test", date: "5 December, 2023" },
  { title: "Prepare Questions for Unit Test", date: "5 December, 2023" },
];

export default function NotesWidget() {
  return (
    <div className="glass-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-slate-800">Notes</h3>
        <button className="p-1 hover:bg-slate-100 rounded transition-colors">
          <Plus size={20} className="text-primary" />
        </button>
      </div>
      <div className="space-y-4">
        {notes.map((n, i) => (
          <div key={i} className="flex gap-4 p-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
               <div className="w-5 h-5 bg-primary rounded-md opacity-80" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight mb-1">{n.title}</p>
              <p className="text-[10px] text-slate-400 font-medium">{n.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
