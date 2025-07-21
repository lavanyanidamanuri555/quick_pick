@@ .. @@
 import { useEffect } from 'react';
 import { Stack } from 'expo-router';
 import { StatusBar } from 'expo-status-bar';
 import { useFrameworkReady } from '@/hooks/useFrameworkReady';
-import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
+import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
 import * as SecureStore from 'expo-secure-store';
 import Constants from 'expo-constants';
+import { View, ActivityIndicator } from 'react-native';

+const tokenCache = {
+  async getToken(key: string) {
+    try {
+      return SecureStore.getItemAsync(key);
+    } catch (err) {
+      return null;
+    }
+  },
+  async saveToken(key: string, value: string) {
+    try {
+      return SecureStore.setItemAsync(key, value);
+    } catch (err) {
+      return;
+    }
+  },
+};
+
+function AuthenticatedLayout() {
+  const { user, isLoaded } = useUser();
+
+  if (!isLoaded) {
+    return (
+      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
+        <ActivityIndicator size="large" color="#3B82F6" />
+      </View>
+    );
+  }
+
+  const userType = user?.publicMetadata?.userType as string;
+
+  return (
+    <Stack screenOptions={{ headerShown: false }}>
+      {userType === 'vendor' ? (
+        <Stack.Screen name="vendor" />
+      ) : userType === 'buyer' ? (
+        <Stack.Screen name="buyer" />
+      ) : (
+        <Stack.Screen name="user-type-selection" />
+      )}
+      <Stack.Screen name="+not-found" />
+    </Stack>
+  );
+}
+
 export default function RootLayout() {
   useFrameworkReady();

-  const clerkFrontendApi = Constants.expoConfig?.extra?.clerkFrontendApi;
   const clerkPublishableKey = Constants.expoConfig?.extra?.clerkPublishableKey;

-  if (!clerkPublishableKey && !clerkFrontendApi) {
+  if (!clerkPublishableKey) {
     console.error('Missing Clerk config in app.json');
     return null;
   }

   return (
     <ClerkProvider
-      tokenCache={SecureStore}
-      publishableKey={clerkPublishableKey ?? undefined}
-      frontendApi={!clerkPublishableKey ? clerkFrontendApi : undefined}
+      tokenCache={tokenCache}
+      publishableKey={clerkPublishableKey}
     >
       <SignedIn>
-        <Stack screenOptions={{ headerShown: false }}>
-          <Stack.Screen name="index" />
-          <Stack.Screen name="vendor" />
-          <Stack.Screen name="buyer" />
-          <Stack.Screen name="+not-found" />
-        </Stack>
+        <AuthenticatedLayout />
       </SignedIn>

       <SignedOut>
         <Stack screenOptions={{ headerShown: false }}>
-          <Stack.Screen name="auth" />
+          <Stack.Screen name="index" />
+          <Stack.Screen name="auth/sign-in" />
+          <Stack.Screen name="auth/sign-up" />
+          <Stack.Screen name="auth/forgot-password" />
           <Stack.Screen name="+not-found" />
         </Stack>
       </SignedOut>