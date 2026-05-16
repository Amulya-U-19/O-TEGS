import React from 'react';
import { Mail, Calendar, Hash, MoreHorizontal } from 'lucide-react';

const students = [
  { id: "256790", name: "Anne Jacob", email: "annejacob@gmail.com", dob: "10 Dec, 2020", class: "7B", color: "#dcfce7", textColor: "#166534" },
  { id: "256750", name: "Emme Seans", email: "emma@gmail.com", dob: "11 Dec, 2020", class: "8A", color: "#f1f5f9", textColor: "#475569" },
  { id: "256730", name: "Sam Watson", email: "sam@gmail.com", dob: "12 Dec, 2020", class: "8A", color: "#f1f5f9", textColor: "#475569" },
];

export default function StudentTable() {
  return (
    <div className="glass-card mt-6">
      <h3 className="font-semibold text-slate-800 mb-6">Student Details</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-slate-400 font-medium">
            <th className="pb-4 px-2"><Hash size={14} /></th>
            <th className="pb-4">Name</th>
            <th className="pb-4">Email</th>
            <th className="pb-4">DOB</th>
            <th className="pb-4">Class/Section</th>
            <th className="pb-4"></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {students.map((s, i) => (
            <tr key={i} className="group hover:bg-slate-50 transition-colors border-t border-slate-100">
              <td className="py-4 px-2 font-semibold text-slate-500">{s.id}</td>
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${s.name}`} alt="" />
                  </div>
                  <span className="font-semibold text-slate-800">{s.name}</span>
                </div>
              </td>
              <td className="py-4 text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-emerald-500" />
                  {s.email}
                </div>
              </td>
              <td className="py-4 text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  {s.dob}
                </div>
              </td>
              <td className="py-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: s.color, color: s.textColor }}>
                  {s.class}
                </span>
              </td>
              <td className="py-4 text-slate-400">
                <MoreHorizontal size={18} className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
