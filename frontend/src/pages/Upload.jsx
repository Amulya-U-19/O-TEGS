import React, { useState } from 'react';
import { Upload as UploadIcon, Video, FileAudio, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/sidebar";
import { API } from "../api";

export default function Upload({ onLogout }) {
  const [status, setStatus] = useState('idle'); // idle, uploading, complete
  const [fileName, setFileName] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setStatus('uploading');

    const form = new FormData();
    form.append("file", file);

    try {
      // Direct upload to the video endpoint
      await API.post("/upload-video/", form);
      setStatus('complete');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert("Upload failed. Make sure the backend is running.");
    }
  };

  return (
    <div className="flex bg-[#f9f9f8] min-h-screen">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-10 pt-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Media Ingestion</h1>
            <p className="text-gray-500 font-medium">Upload lecture videos or audio recordings for automated AI evaluation.</p>
          </div>

          <div className="opti-card !p-12 border-dashed border-2 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-black transition-all relative">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleUpload}
              accept="video/*,audio/*,.csv"
            />
            
            {status === 'idle' && (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
                  <UploadIcon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Drop files here or click to upload</h3>
                <p className="text-sm text-gray-400 font-medium">Supports MP4, WAV, and Student Feedback CSVs.</p>
              </>
            )}

            {status === 'uploading' && (
              <>
                <Loader2 className="animate-spin text-primary mb-6" size={48} />
                <h3 className="text-xl font-bold mb-2">Processing {fileName}</h3>
                <p className="text-sm text-gray-400 font-medium">Extracting audio and generating embeddings...</p>
              </>
            )}

            {status === 'complete' && (
              <>
                <CheckCircle className="text-emerald-500 mb-6" size={48} />
                <h3 className="text-xl font-bold mb-2">Analysis Complete!</h3>
                <p className="text-sm text-gray-400 font-medium">Head to the dashboard to see your results.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 bg-black text-white rounded-xl font-bold text-sm"
                >
                  Upload Another
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="flex gap-4 items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                 <Video size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Video Processing</h4>
                <p className="text-xs text-gray-500 mt-1">Automatic audio extraction from 4K/HD lecture videos.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                 <FileAudio size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Offline Transcription</h4>
                <p className="text-xs text-gray-500 mt-1">Strips audio into chunks for local STT processing.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}