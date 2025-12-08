import React from 'react';
import { SKILLS } from '../constants';

const SkillsContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {SKILLS.map((category, index) => (
        <fieldset key={index} className="border-2 border-gray-400 p-4 bg-gray-50">
          <legend className="px-2 font-retro font-bold text-[#000080] text-lg bg-gray-50 border border-gray-300 shadow-sm">
            {category.category}
          </legend>
          <ul className="space-y-2 mt-2">
            {category.items.map((skill, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-mono text-gray-800">
                <div className="w-1.5 h-1.5 bg-black"></div>
                {skill}
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
      
      {/* Decorative 'Hardware' Box */}
      <fieldset className="border-2 border-gray-400 p-4 bg-gray-800 text-green-400">
        <legend className="px-2 font-retro font-bold text-white text-lg bg-gray-800 border border-gray-600">
          System_Status
        </legend>
        <div className="font-mono text-xs space-y-1">
          <div className="flex justify-between">
            <span>UPTIME:</span>
            <span>7 YEARS+</span>
          </div>
          <div className="flex justify-between">
             <span>MEMORY:</span>
             <span>FULL STACK</span>
          </div>
          <div className="flex justify-between">
             <span>CPU:</span>
             <span>HIGH EFFICIENCY</span>
          </div>
          <div className="mt-4 text-center border-t border-green-800 pt-2 animate-pulse">
            READY FOR NEW CHALLENGES
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default SkillsContent;