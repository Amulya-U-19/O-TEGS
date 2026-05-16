import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';

const events = [
  { time: "11:00 AM - 12:00 PM", title: "Math Class with 6A", type: "Math" },
  { time: "11:00 AM - 12:00 PM", title: "Math Class with 6A", type: "Math" },
  { time: "11:00 AM - 12:00 PM", title: "Math Class with 6A", type: "Math" },
  { time: "11:00 AM - 12:00 PM", title: "Math Class with 6A", type: "Math" },
];

export default function RecentSchedule() {
  return (
    <div className="glass-card h-full">
      <h3 className="font-semibold text-slate-800 mb-6">Recent Schedule</h3>
      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-primary rounded-lg text-white font-bold text-xs">
                {e.time}
              </div>
              <span className="text-sm font-semibold text-slate-700">{e.title}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-[10px] text-primary font-bold cursor-pointer">
                <span>• Class Details</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-primary font-bold cursor-pointer">
                <span>• Homework</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
