
import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Fixed theme to dark only
  const [theme, setTheme] = useState<Theme>('dark');

  // No need for initializing from localStorage or toggling
  useEffect(() => {
    // Remove any light mode classes
    document.documentElement.classList.remove('light-mode');
  }, []);

  // Keeping the toggle function for API compatibility, but it will do nothing
  const toggleTheme = () => {
    // No-op function, theme is fixed to dark
    console.log("Theme toggling is disabled - using dark mode only");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
