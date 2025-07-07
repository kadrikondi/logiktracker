import type { Theme } from '@/types/theme';

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: '#ededed',
    surface: '#FFFFFF',
    primary: '#593054',
    secondary: '#214592',
    accent: '#f51499',
    text: '#593054',
    textSecondary: '#214592',
    border: '#593054',
    success: '#1df914',
    error: '#f51499',
    warning: '#ff9500',
    info: '#214592',
  },
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: '#1a1a1a',
    surface: '#2d2d2d',
    primary: '#b794a8',
    secondary: '#6ba3ff',
    accent: '#ff69b4',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#404040',
    success: '#4ade80',
    error: '#f87171',
    warning: '#fbbf24',
    info: '#60a5fa',
  },
};