import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="nav-item !mt-auto"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-6 h-6 flex-shrink-0" />
          <span className="font-medium">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="w-6 h-6 flex-shrink-0" />
          <span className="font-medium">Light Mode</span>
        </>
      )}
    </button>
  );
};