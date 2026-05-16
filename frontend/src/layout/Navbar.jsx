import React from 'react';
import { Hexagon } from 'lucide-react';

export default function Navbar() {
  const username = localStorage.getItem('username') || "Teacher";
  
  return (
    <div className="flex items-center justify-between px-10 py-5 bg-[#f9f9f8] border-b border-gray-100">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2">
          <Hexagon className="text-black fill-black" size={24} />
          <span className="text-xl font-bold tracking-tight">O-TEGS</span>
        </div>
        
        <nav className="flex gap-4">
           <span className="text-sm font-bold text-gray-900 px-4 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100 italic">
              AI Evaluation Active
           </span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pr-2">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 leading-tight capitalize">{username}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Offline Mode</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-black/20">
            {username.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}