import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  color?: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon: Icon, onClick, color = "text-blue-200" }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 w-24 h-24 hover:bg-white/10 border border-transparent hover:border-white/20 hover:border-dotted cursor-pointer group"
    >
      <Icon size={40} className={`${color} drop-shadow-md group-hover:scale-105 transition-transform`} />
      <span className="text-white text-xs text-center px-1 py-0.5 bg-[#008080] group-hover:bg-[#000080] font-retro tracking-wide shadow-sm">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;