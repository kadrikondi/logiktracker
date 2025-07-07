import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '@/utils/theme';
import type { Theme } from '@/types/theme';

const THEME_KEY = 'theme_mode';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemeMode();
  }, []);

  const loadThemeMode = async () => {
    try {
      const value = await AsyncStorage.getItem(THEME_KEY);
      if (value !== null) {
        const darkMode = JSON.parse(value);
        setIsDarkMode(darkMode);
      }
    } catch (error) {
      console.error('Error loading theme mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    try {
      await AsyncStorage.setItem(THEME_KEY, JSON.stringify(newMode));
      setIsDarkMode(newMode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const theme: Theme = isDarkMode ? darkTheme : lightTheme;

  return {
    theme,
    isDarkMode,
    toggleTheme,
    isLoading,
  };
}