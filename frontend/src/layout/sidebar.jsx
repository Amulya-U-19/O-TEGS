import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, ClipboardCheck, BookOpen, Settings, Upload as UploadIcon } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
    { icon: <UploadIcon size={20} />, label: "Upload", path: "/upload" },
  ];

  const username = localStorage.getItem('username') || "Teacher";

  return (
    <div className="w-64 bg-[#1a1c1e] text-white min-h-screen p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
          <GraduationCap className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight">O-TEGS</span>
      </div>

      <nav className="flex-1">
        {menuItems.map((item, idx) => (
          <Link 
            to={item.path}
            key={idx} 
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">
            {username.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold capitalize">{username}</p>
            <p className="text-xs text-slate-400">Teacher Account</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full py-2 px-4 bg-red-500/10 text-red-500 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}