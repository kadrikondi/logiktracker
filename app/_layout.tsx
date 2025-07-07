import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSegments } from 'expo-router';

export default function RootLayout() {
  useFrameworkReady();
  
  const { authState, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // useEffect(() => {
  //   if (isLoading) return;

  //   const inAuthGroup = segments[0] === '(tabs)';

  //   if (!authState.isAuthenticated && inAuthGroup) {
  //     // Redirect to login if not authenticated and trying to access protected routes
  //     router.replace('/login');
  //   } else if (authState.isAuthenticated && !inAuthGroup) {
  //     // Redirect to tabs if authenticated and not in protected routes
  //     router.replace('/(tabs)');
  //   }
  // }, [authState.isAuthenticated, segments, isLoading]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="package/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}