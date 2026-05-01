import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getStoredTheme,
  setStoredTheme,
  ThemeName,
} from '@/services/themeStorage';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  danger: string;
  success: string;
  warning: string;
  border: string;
}

const lightColors: ThemeColors = {
  background: '#f4f6f8',
  surface: '#ffffff',
  surfaceMuted: '#eef0f4',
  text: '#1a1a1a',
  textMuted: '#666666',
  primary: '#2563eb',
  primaryText: '#ffffff',
  danger: '#dc2626',
  success: '#16a34a',
  warning: '#d97706',
  border: '#e2e5ea',
};

const darkColors: ThemeColors = {
  background: '#0f1115',
  surface: '#1a1d23',
  surfaceMuted: '#22262d',
  text: '#f4f6f8',
  textMuted: '#a0a4ad',
  primary: '#3b82f6',
  primaryText: '#ffffff',
  danger: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  border: '#2c313a',
};

interface ThemeContextType {
  theme: ThemeName;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('light');

  useEffect(() => {
    let active = true;

    getStoredTheme().then((stored) => {
      if (active && stored) {
        setTheme(stored);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeName = prev === 'light' ? 'dark' : 'light';
      setStoredTheme(next);
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      colors: theme === 'dark' ? darkColors : lightColors,
      toggleTheme,
      isDark: theme === 'dark',
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }

  return context;
}
