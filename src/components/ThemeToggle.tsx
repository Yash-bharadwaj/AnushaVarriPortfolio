
import React from 'react';
import { Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme } = useTheme();

  return (
    <button
      aria-label="Dark theme"
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-anushagold/20 hover:bg-anushagold/30 text-anushagold"
    >
      <Moon size={18} className="animate-fade-in" />
    </button>
  );
};

export default ThemeToggle;
