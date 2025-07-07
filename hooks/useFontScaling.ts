import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FONT_SCALING_KEY = 'font_scaling_enabled';

export function useFontScaling() {
  const [fontScalingEnabled, setFontScalingEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFontScalingSetting();
  }, []);

  const loadFontScalingSetting = async () => {
    try {
      const value = await AsyncStorage.getItem(FONT_SCALING_KEY);
      if (value !== null) {
        setFontScalingEnabled(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error loading font scaling setting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFontScaling = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(FONT_SCALING_KEY, JSON.stringify(enabled));
      setFontScalingEnabled(enabled);
    } catch (error) {
      console.error('Error saving font scaling setting:', error);
    }
  };

  return {
    fontScalingEnabled,
    updateFontScaling,
    isLoading,
  };
}