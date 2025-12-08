import React, { useState, useEffect } from 'react';
import { User, Briefcase, Cpu, Terminal as TerminalIcon, Mail, Github, Linkedin, Phone } from 'lucide-react';
import { WindowType, WindowState } from './types';
import { initializeGemini } from './services/geminiService';

// Components
import RetroWindow from './components/RetroWindow';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';
import Terminal from './components/Terminal';
import AboutContent from './components/AboutContent';
import ExperienceContent from './components/ExperienceContent';
import SkillsContent from './components/SkillsContent';

const INITIAL_WINDOWS: WindowState[] = [
  { id: WindowType.ABOUT, title: 'About_Me.txt', isOpen: true, isMinimized: false, zIndex: 1, position: { x: 50, y: 50 } },
  { id: WindowType.EXPERIENCE, title: 'Experience_Log.doc', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 80, y: 80 } },
  { id: WindowType.SKILLS, title: 'Skills_Matrix.exe', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 110, y: 110 } },
  { id: WindowType.TERMINAL, title: 'AI_Terminal_v1.0', isOpen: false, isMinimized: false, zIndex: 0, position: { x: 140, y: 140 } },
];

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowType | null>(WindowType.ABOUT);
  const [maxZIndex, setMaxZIndex] = useState(10);

  useEffect(() => {
    initializeGemini();
  }, []);

  const handleOpenWindow = (id: WindowType) => {
    setWindows(prev => {
      const win = prev.find(w => w.id === id);
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);

      if (win && win.isOpen) {
        // If minimized, unminimize and bring to front
        return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w);
      } else if (win) {
        // Open it
        return prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: newZ } : w);
      }
      return prev;
    });
    setActiveWindowId(id);
  };

  const handleCloseWindow = (id: WindowType) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMinimizeWindow = (id: WindowType) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleFocusWindow = (id: WindowType) => {
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w));
    setActiveWindowId(id);
  };

  const handleMoveWindow = (id: WindowType, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  // Helper to render content based on window type
  const renderWindowContent = (id: WindowType) => {
    switch (id) {
      case WindowType.ABOUT: return <AboutContent />;
      case WindowType.EXPERIENCE: return <ExperienceContent />;
      case WindowType.SKILLS: return <SkillsContent />;
      case WindowType.TERMINAL: return <Terminal />;
      default: return null;
    }
  };

  // Simulated Start Menu Action
  const handleStartClick = () => {
    alert("Welcome to Portfolio OS. Please click the Desktop Icons to navigate.");
  };

  return (
    <div className="h-[100dvh] w-screen bg-[#008080] overflow-hidden relative font-mono text-gray-900 selection:bg-[#000080] selection:text-white">
      
      {/* Desktop Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Desktop Icons - Responsive Layout */}
      <div className="absolute top-4 left-4 right-4 md:right-auto flex flex-row flex-wrap md:flex-col gap-4 md:gap-6 z-0 md:max-w-none justify-start md:justify-start">
        <DesktopIcon 
          label="My Profile" 
          icon={User} 
          onClick={() => handleOpenWindow(WindowType.ABOUT)} 
          color="text-yellow-200"
        />
        <DesktopIcon 
          label="Experience" 
          icon={Briefcase} 
          onClick={() => handleOpenWindow(WindowType.EXPERIENCE)} 
          color="text-amber-600"
        />
        <DesktopIcon 
          label="Tech Stack" 
          icon={Cpu} 
          onClick={() => handleOpenWindow(WindowType.SKILLS)} 
          color="text-blue-300"
        />
        <DesktopIcon 
          label="AI Terminal" 
          icon={TerminalIcon} 
          onClick={() => handleOpenWindow(WindowType.TERMINAL)} 
          color="text-green-400"
        />
        
        {/* External Links */}
        <div className="md:mt-8 md:border-t md:border-white/20 md:pt-4 flex flex-row md:flex-col gap-4 md:gap-6">
           <a href="https://www.linkedin.com/in/amasdirga/" target="_blank" rel="noopener noreferrer">
             <DesktopIcon label="LinkedIn" icon={Linkedin} onClick={() => {}} color="text-blue-500" />
           </a>
           <a href="https://github.com/amasdirga" target="_blank" rel="noopener noreferrer">
             <DesktopIcon label="GitHub" icon={Github} onClick={() => {}} color="text-white" />
           </a>
           <a href="mailto:amasdirgamardika@gmail.com">
             <DesktopIcon label="Email Me" icon={Mail} onClick={() => {}} color="text-red-300" />
           </a>
           <a href="tel:+6281239494979">
             <DesktopIcon label="Call Me" icon={Phone} onClick={() => {}} color="text-green-400" />
           </a>
        </div>
      </div>

      {/* Windows Manager */}
      {windows.map((win) => (
        <RetroWindow
          key={win.id}
          id={win.id}
          title={win.title}
          isOpen={win.isOpen}
          isMinimized={win.isMinimized}
          zIndex={win.zIndex}
          position={win.position}
          onClose={handleCloseWindow}
          onMinimize={handleMinimizeWindow}
          onFocus={handleFocusWindow}
          onMove={handleMoveWindow}
          // Adjust width/height for Terminal
          width={win.id === WindowType.TERMINAL ? "w-full md:w-[700px]" : undefined}
          height={win.id === WindowType.TERMINAL ? "h-[400px]" : undefined}
        >
          {renderWindowContent(win.id)}
        </RetroWindow>
      ))}

      {/* Taskbar */}
      <Taskbar 
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={(id) => {
            const win = windows.find(w => w.id === id);
            if (win?.isOpen && !win.isMinimized && activeWindowId === id) {
                handleMinimizeWindow(id);
            } else {
                handleFocusWindow(id);
            }
        }}
        onStartClick={handleStartClick}
      />
    </div>
  );
};

export default App;