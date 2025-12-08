import React from 'react';
import { User, Code, Database, Zap } from 'lucide-react';

const AboutContent: React.FC = () => {
  return (
    <div className="space-y-6 text-gray-800">
      <div className="flex flex-col md:flex-row items-start gap-4 border-b-2 border-gray-300 pb-4">
        <div className="w-24 h-24 bg-gray-300 border-2 border-gray-400 flex items-center justify-center shadow-inner shrink-0 overflow-hidden relative group">
           {/* 
              Replaced Icon with Image. 
              NOTE: Please place 'profile_elephant.jpg' in your public folder.
           */}
           <img 
             src="./profile_elephant.jpg" 
             alt="Amas Dirga Profile" 
             className="w-full h-full object-cover"
             onError={(e) => {
               // Fallback if image not found
               e.currentTarget.style.display = 'none';
               e.currentTarget.parentElement?.classList.add('fallback-icon');
             }}
           />
           <User size={48} className="text-gray-500 hidden group-[.fallback-icon]:block absolute" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-retro mb-1">Amas Dirga Mardika</h2>
          <p className="font-bold text-[#000080] text-sm">ERP Consultant & Fullstack Dev</p>
          <p className="italic text-gray-600 mb-2">"Architecting the future of enterprise systems."</p>
          <div className="flex flex-wrap gap-2">
             <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 border border-purple-300 font-bold uppercase shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">System Consultation</span>
             <span className="bg-green-100 text-green-800 text-xs px-2 py-1 border border-green-300 font-bold uppercase shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">Freelance Available</span>
             </div>
        </div>
      </div>

      <div className="prose prose-sm max-w-none font-mono">
        <p className="mb-4">
           I am a <strong>Full-time ERP Consultant Supervisor</strong> by day, and a <strong>Fullstack Innovator</strong> by night.
        </p>
        <p className="mb-4">
          I don't just maintain legacy systems; I reinvent them. From customizing intricate ERP modules to building high-performance modern web apps, I bridge the gap between stability and futuristic agility.
        </p>
        <div className="bg-[#ffffcc] p-3 border-l-4 border-[#000080] text-sm shadow-sm">
          <p className="font-bold text-[#000080] mb-1">CURRENT MISSION:</p>
          <p className="italic text-gray-800">"I am actively seeking new challenges and futuristic ideas. If it's complex, ambitious, and pushes the boundaries, I'm interested."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-100 p-3 border border-gray-400 shadow-sm group hover:bg-white hover:shadow-md transition-all cursor-default">
          <Database className="mb-2 text-[#008080] group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm mb-1 group-hover:text-[#008080]">ERP Architect</h3>
          <p className="text-xs text-gray-600">7+ Years. Customizing the uncustomizable. Making heavy systems fly.</p>
        </div>
        <div className="bg-gray-100 p-3 border border-gray-400 shadow-sm group hover:bg-white hover:shadow-md transition-all cursor-default">
          <Code className="mb-2 text-[#800000] group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm mb-1 group-hover:text-[#800000]">Code Wizard</h3>
          <p className="text-xs text-gray-600">Python FastAPI, Django, React, Smalltalk. From legacy to bleeding edge.</p>
        </div>
        <div className="bg-gray-100 p-3 border border-gray-400 shadow-sm group hover:bg-white hover:shadow-md transition-all cursor-default">
          <Zap className="mb-2 text-[#000080] group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-sm mb-1 group-hover:text-[#000080]">Visionary</h3>
          <p className="text-xs text-gray-600">Obsessed with efficiency and futuristic implementation.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;