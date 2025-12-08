import React, { useState, useEffect } from 'react';
import { WindowType, WindowState } from '../types';
import { AppWindow } from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: WindowType | null;
  onWindowClick: (id: WindowType) => void;
  onStartClick: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, activeWindowId, onWindowClick, onStartClick }) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 fixed bottom-0 left-0 w-full z-50 select-none shadow-md">
      
      {/* Start Button */}
      <button 
        onClick={onStartClick}
        className="flex items-center gap-1.5 px-3 h-8 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white font-bold mr-2 shadow-sm"
      >
        <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center relative overflow-hidden">
             {/* Simple retro Windows logo approximation */}
             <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[1px]">
                 <div className="bg-[#ff4444]"></div>
                 <div className="bg-[#44ff44]"></div>
                 <div className="bg-[#4444ff]"></div>
                 <div className="bg-[#ffff44]"></div>
             </div>
        </div>
        <span className="font-retro tracking-wider">Start</span>
      </button>

      {/* Divider */}
      <div className="w-[2px] h-6 bg-gray-400 border-r border-white mx-1"></div>

      {/* Active Windows */}
      <div className="flex-1 flex gap-1 overflow-x-auto no-scrollbar">
        {windows.filter(w => w.isOpen).map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`
              flex items-center gap-2 px-3 h-8 min-w-[140px] max-w-[200px] truncate
              border-2 text-sm font-retro tracking-wide
              ${activeWindowId === win.id && !win.isMinimized
                ? 'bg-[#e0e0e0] border-t-black border-l-black border-b-white border-r-white font-bold shadow-inner' 
                : 'bg-[#c0c0c0] border-t-white border-l-white border-b-black border-r-black shadow-sm'}
            `}
          >
             <AppWindow size={14} className="flex-shrink-0" />
             <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="h-8 bg-[#c0c0c0] border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white px-3 flex items-center justify-center min-w-[80px] ml-2 shadow-inner">
        <span className="font-retro text-sm">{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;