import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

export default function RootLayout() {
  useFrameworkReady();

  const clerkFrontendApi = Constants.expoConfig?.extra?.clerkFrontendApi;
  const clerkPublishableKey = Constants.expoConfig?.extra?.clerkPublishableKey;

  if (!clerkPublishableKey && !clerkFrontendApi) {
    console.error('Missing Clerk config in app.json');
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={SecureStore}
      publishableKey={clerkPublishableKey ?? undefined}
      frontendApi={!clerkPublishableKey ? clerkFrontendApi : undefined}
    >
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="vendor" />
          <Stack.Screen name="buyer" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SignedIn>

      <SignedOut>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SignedOut>

      <StatusBar style="auto" />
    </ClerkProvider>
  );
}
