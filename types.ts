export enum WindowType {
  ABOUT = 'ABOUT',
  EXPERIENCE = 'EXPERIENCE',
  SKILLS = 'SKILLS',
  TERMINAL = 'TERMINAL',
  CONTACT = 'CONTACT'
}

export interface WindowState {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
  logo?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}