import React from 'react';
import { MoreVertical } from 'lucide-react';

const steps = [
  { date: "06.02.26", title: "Video Uploaded", desc: "Lecture session successfully uploaded", status: "completed" },
  { date: "07.02.26", title: "Audio Extracted", desc: "WAV conversion complete", status: "completed" },
  { date: "08.02.26", title: "Transcription Started", desc: "Vosk model processing audio", status: "active" },
  { date: "09.02.26", title: "In Analysis", desc: "Sentiment and Clarity checks", status: "pending" },
  { date: "10.02.26", title: "Issue detected", desc: "Background noise flagged", status: "error" },
];

export default function ProcessTimeline() {
  return (
    <div className="opti-card">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-bold text-gray-900">Process Tracking</h3>
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-white transition-all">
          <MoreVertical size={16} />
        </div>
      </div>

      <div className="space-y-0 relative">
        <div className="timeline-line"></div>
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-6 pb-8 last:pb-0 relative">
            <div className="text-[11px] font-bold text-gray-400 w-16 pt-1">{step.date}</div>
            <div className={`timeline-dot mt-1.5 ${step.status === 'error' ? 'bg-red-500' : step.status === 'pending' ? 'bg-gray-300' : 'bg-black'}`}></div>
            <div>
              <p className="text-sm font-bold text-gray-900">{step.title}</p>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
