import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { WindowType } from '../types';

interface RetroWindowProps {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  onClose: (id: WindowType) => void;
  onMinimize: (id: WindowType) => void;
  onFocus: (id: WindowType) => void;
  onMove: (id: WindowType, x: number, y: number) => void;
  children: ReactNode;
  width?: string;
  height?: string;
}

const RetroWindow: React.FC<RetroWindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized,
  zIndex,
  position,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  children,
  width = "w-full md:w-[600px]",
  height = "h-[400px] md:h-[500px]"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isDragging || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      onMove(id, e.clientX - dragOffset.current.x, e.clientY - dragOffset.current.y);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, onMove, isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || isMobile) return; // Only allow left click drag, disable on mobile
    e.stopPropagation();
    onFocus(id);
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  if (!isOpen || isMinimized) return null;

  // Mobile: Fixed full screen. Desktop: Absolute positioned.
  const containerClass = isMobile
    ? "fixed top-0 left-0 w-full h-[calc(100vh-40px)] flex flex-col bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-black border-r-black shadow-xl"
    : `absolute flex flex-col bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-black border-r-black shadow-xl ${width} ${height}`;

  // On mobile, ignore left/top position
  const containerStyle = isMobile
    ? { zIndex }
    : { left: position.x, top: position.y, zIndex };

  return (
    <div
      className={containerClass}
      style={containerStyle}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div 
        className={`h-8 bg-[#000080] flex items-center justify-between px-1 select-none ${isMobile ? '' : 'cursor-move'}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 pointer-events-none">
          {/* Icon placeholder */}
          <div className="w-4 h-4 bg-white/20 border border-white/40"></div>
          <span className="text-white font-bold text-sm font-retro tracking-wider pt-1">{title}</span>
        </div>
        <div className="flex gap-1" onMouseDown={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
          >
            <Minus size={12} className="text-black" />
          </button>
          {!isMobile && (
            <button 
              className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
            >
              <Square size={10} className="text-black" />
            </button>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white ml-1"
          >
            <X size={12} className="text-black" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-1 overflow-hidden">
        <div className="w-full h-full bg-white border-2 border-t-black border-l-black border-b-white border-r-white overflow-auto font-sans p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RetroWindow;