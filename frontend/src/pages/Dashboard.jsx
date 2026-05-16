import React, { useState, useEffect } from 'react';
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/sidebar";
import MetricCard from "../components/MetricCard";
import CompetencyRadar from "../components/CompetencyRadar";
import ProcessTimeline from "../components/ProcessTimeline";
import TeacherComparisonWidget from "../components/TeacherComparisonWidget";
import { SlidersHorizontal, Zap, BarChart3, Clock, TrendingUp, Sparkles, AlertCircle, RefreshCw, ShieldAlert, MessageSquare, ClipboardCheck, Scale } from 'lucide-react';
import { API } from '../api';

export default function Dashboard({ onLogout }) {
  const [data, setData] = useState({
    clarity: 0,
    coverage: 0,
    engagement_score: 0,
    structure: 0,
    vocabulary_appropriateness: 0,
    explanation_quality: 0,
    participation_index: 0,
    bias_detected: false,
    bias_details: "",
    consensus_index: 0,
    final_verdict: "Awaiting multi-source data...",
    strengths: "Ready for analysis...",
    improvements: "Ready for analysis...",
    explainability_logic: "",
    status: 'idle'
  });

  const fetchAnalysis = async () => {
    setData(prev => ({ ...prev, status: 'loading' }));
    try {
      const res = await API.get('/evaluate/', { params: { query: "teaching performance and student engagement" } });
      setData(prev => ({ ...prev, ...res.data, status: 'success' }));
    } catch (err) {
      console.error(err);
      setData(prev => ({ ...prev, status: 'error' }));
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <div className="flex bg-[#f9f9f8] min-h-screen">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <main className="max-w-[1600px] mx-auto px-10 pt-12 w-full">
          
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Teacher Evaluation & Growth</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">Multi-source correlation analysis vs Student Feedback.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={fetchAnalysis}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
              >
                <RefreshCw size={18} className={data.status === 'loading' ? 'animate-spin' : ''} />
                {data.status === 'loading' ? 'Comparing Audio vs CSV...' : 'Run Consensus Report'}
              </button>
            </div>
          </div>

          {/* Final Consensus Summary (The New Requirement) */}
          <div className="mb-10 bg-white border border-gray-100 p-8 rounded-[38px] shadow-sm flex items-center gap-10">
             <div className="relative">
                <div className="w-24 h-24 rounded-full border-[6px] border-black/5 flex items-center justify-center">
                   <span className="text-2xl font-black">{data.consensus_index || 0}/10</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter">
                   Sync Level
                </div>
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                   <Scale className="text-gray-900" size={20} />
                   <h2 className="text-xl font-bold text-gray-900">Final Decision Output</h2>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-4xl">
                   {data.final_verdict}
                </p>
             </div>
             <div className="hidden xl:flex flex-col gap-2 min-w-[180px]">
                <div className="px-4 py-2 bg-emerald-50 rounded-xl flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span className="text-[10px] font-bold text-emerald-700 uppercase">Transcript Analyzed</span>
                </div>
                <div className="px-4 py-2 bg-blue-50 rounded-xl flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <span className="text-[10px] font-bold text-blue-700 uppercase">Feedback Correlated</span>
                </div>
             </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             <MetricCard 
               title="Clarity" 
               value={data.clarity || "0"} 
               change={`${data.structure || 0}/10 Structure`} 
               icon={Zap} 
               color="#2185f8" 
             />
             <MetricCard 
               title="Engagement" 
               value={`${data.engagement_score || "0"}/10`} 
               change={`Participation Index: ${data.participation_index || 0}`} 
               icon={TrendingUp} 
               color="#f87d4c" 
             />
             <MetricCard 
               title="Coverage" 
               value={data.coverage || "0"} 
               change="Concept depth" 
               icon={Clock} 
               color="#1a1a1a" 
             />
             <MetricCard 
               title="Vocab Score" 
               value={data.vocabulary_appropriateness || "0"} 
               change="Exp. Quality" 
               icon={BarChart3} 
               color="#2185f8" 
             />
          </div>

          {/* Deep Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
             <div className="lg:col-span-2">
                <CompetencyRadar metrics={data} />
             </div>
             <div className="lg:col-span-1">
                <TeacherComparisonWidget />
             </div>
             <div className="lg:col-span-1">
                <ProcessTimeline />
             </div>
          </div>

        </main>
      </div>
    </div>
  );
}