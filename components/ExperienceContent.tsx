import React from 'react';
import { EXPERIENCES } from '../constants';
import { Building2, Calendar, MapPin } from 'lucide-react';

const ExperienceContent: React.FC = () => {
  return (
    <div className="relative border-l-2 border-gray-300 ml-3 space-y-8 py-2">
      {EXPERIENCES.map((exp, index) => (
        <div key={index} className="relative pl-8">
          {/* Timeline Dot */}
          <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-200 border-2 border-gray-500 rounded-full"></div>
          
          <div className="bg-[#ffffe0] p-4 border border-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <h3 className="text-lg font-bold text-[#000080] font-retro tracking-wide">{exp.role}</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs text-gray-600 mb-3 border-b border-gray-300 pb-2">
              <div className="flex items-center gap-1">
                <Building2 size={12} />
                <span className="font-semibold">{exp.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{exp.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{exp.location}</span>
              </div>
            </div>
            
            <ul className="list-disc list-inside space-y-1 mb-4 text-sm font-mono text-gray-800">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill, i) => (
                <span key={i} className="text-xs bg-white border border-gray-400 px-2 py-0.5 shadow-sm text-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceContent;