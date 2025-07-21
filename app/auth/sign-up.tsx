import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { Mail, User, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';

export default function SignUpScreen() {
  const router = useRouter();
  const { userType } = useLocalSearchParams<{ userType: string }>();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpMethod, setSignUpMethod] = useState<'email' | 'username'>('email');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const signUpData = signUpMethod === 'email' 
        ? { emailAddress, password }
        : { username, emailAddress, password };

      await signUp.create({
        ...signUpData,
        unsafeMetadata: {
          userType: userType || 'buyer',
        },
      });

      if (signUpMethod === 'email') {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      } else {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      }

      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        
        // Update user metadata with userType
        await completeSignUp.createdUserId && 
        await fetch(`https://api.clerk.com/v1/users/${completeSignUp.createdUserId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_metadata: {
              userType: userType || 'buyer',
            },
          }),
        });

        router.replace(userType === 'vendor' ? '/vendor' : '/buyer');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.title}>
            Sign Up as {userType === 'vendor' ? 'Vendor' : 'Buyer'}
          </Text>
          <Text style={styles.subtitle}>
            Create your account to get started
          </Text>
        </View>

        {!pendingVerification ? (
          <View style={styles.formContainer}>
            <View style={styles.methodSelector}>
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  signUpMethod === 'email' && styles.activeMethodButton,
                ]}
                onPress={() => setSignUpMethod('email')}>
                <Text
                  style={[
                    styles.methodButtonText,
                    signUpMethod === 'email' && styles.activeMethodButtonText,
                  ]}>
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  signUpMethod === 'username' && styles.activeMethodButton,
                ]}
                onPress={() => setSignUpMethod('username')}>
                <Text
                  style={[
                    styles.methodButtonText,
                    signUpMethod === 'username' && styles.activeMethodButtonText,
                  ]}>
                  Username
                </Text>
              </TouchableOpacity>
            </View>

            {signUpMethod === 'username' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {signUpMethod === 'username' ? 'Primary Email' : 'Email Address'}
              </Text>
              <View style={styles.inputContainer}>
                <Mail size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, { paddingRight: 50 }]}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={20} color="#6b7280" />
                  ) : (
                    <Eye size={20} color="#6b7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.signUpButton, isLoading && styles.disabledButton]}
              onPress={onSignUpPress}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.signUpButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.verificationContainer}>
            <Text style={styles.verificationTitle}>Verify Your Email</Text>
            <Text style={styles.verificationText}>
              We've sent a verification code to {emailAddress}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Verification Code</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.verifyButton, isLoading && styles.disabledButton]}
              onPress={onPressVerify}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify & Continue</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPendingVerification(false)}
              style={styles.backToSignUpButton}>
              <Text style={styles.backToSignUpText}>Back to Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  methodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeMethodButton: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  methodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeMethodButtonText: {
    color: '#1f2937',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
  },
  signUpButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  signInText: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  signInLink: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  verificationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  verificationText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  verifyButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  backToSignUpButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  backToSignUpText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
});