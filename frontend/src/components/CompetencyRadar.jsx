import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export default function CompetencyRadar({ metrics = {} }) {
  const chartData = [
    { subject: 'Clarity', teacher: metrics.clarity || 0, benchmark: 7.5, fullMark: 10 },
    { subject: 'Engagement', teacher: metrics.engagement_score || 0, benchmark: 8.0, fullMark: 10 },
    { subject: 'Structure', teacher: metrics.structure || 0, benchmark: 7.0, fullMark: 10 },
    { subject: 'Expl. Quality', teacher: metrics.explanation_quality || 0, benchmark: 7.2, fullMark: 10 },
    { subject: 'Vocab', teacher: metrics.vocabulary_appropriateness || 0, benchmark: 8.5, fullMark: 10 },
  ];

  return (
    <div className="opti-card col-span-2">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-900">Fair Benchmarking</h3>
        <span className="text-xs font-bold text-gray-400">Teacher vs Local Average</span>
      </div>
      
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#e4e4e7" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }} />
            <Radar
              name="Current Teacher"
              dataKey="teacher"
              stroke="#2185f8"
              fill="#2185f8"
              fillOpacity={0.3}
            />
            <Radar
              name="Benchmark"
              dataKey="benchmark"
              stroke="#d1d5db"
              fill="#d1d5db"
              fillOpacity={0.1}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(33,133,248,0.5)]"></div>
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Teacher Profile</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Standard Benchmark</span>
        </div>
      </div>
    </div>
  );
}
