import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, AuthState } from '@/types/auth';

const AUTH_KEY = 'auth_state';
const DUMMY_USER: User = {
  id: '1',
  email: 'demo@logitrack.com',
  name: 'Demo User',
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_KEY);
      if (value !== null) {
        const savedState = JSON.parse(value);
        setAuthState(savedState);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Dummy authentication - accept any email/password combination
    if (email && password) {
      const newAuthState: AuthState = {
        isAuthenticated: true,
        user: { ...DUMMY_USER, email },
      };
      
      try {
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(newAuthState));
        setAuthState(newAuthState);
        return true;
      } catch (error) {
        console.error('Error saving auth state:', error);
        return false;
      }
    }
    return false;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
    } catch (error) {
      console.error('Error clearing auth state:', error);
    }
  };

  return {
    authState,
    isLoading,
    login,
    logout,
  };
}