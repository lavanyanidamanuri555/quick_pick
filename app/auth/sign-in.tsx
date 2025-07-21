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
import { useRouter } from 'expo-router';
import { useSignIn, useUser } from '@clerk/clerk-expo';
import { Mail, User, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { user } = useUser();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signInMethod, setSignInMethod] = useState<'email' | 'username'>('email');
  const [pendingVerification, setPendingVerification] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        
        // Get user type from metadata and redirect accordingly
        const userType = user?.publicMetadata?.userType as string;
        router.replace(userType === 'vendor' ? '/vendor' : '/buyer');
      } else if (signInAttempt.status === 'needs_first_factor') {
        // Handle MFA or email verification if needed
        if (signInAttempt.supportedFirstFactors.find(f => f.strategy === 'email_code')) {
          await signIn.prepareFirstFactor({ strategy: 'email_code' });
          setPendingVerification(true);
        }
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        
        const userType = user?.publicMetadata?.userType as string;
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {!pendingVerification ? (
          <View style={styles.formContainer}>
            <View style={styles.methodSelector}>
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  signInMethod === 'email' && styles.activeMethodButton,
                ]}
                onPress={() => setSignInMethod('email')}>
                <Text
                  style={[
                    styles.methodButtonText,
                    signInMethod === 'email' && styles.activeMethodButtonText,
                  ]}>
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.methodButton,
                  signInMethod === 'username' && styles.activeMethodButton,
                ]}
                onPress={() => setSignInMethod('username')}>
                <Text
                  style={[
                    styles.methodButtonText,
                    signInMethod === 'username' && styles.activeMethodButtonText,
                  ]}>
                  Username
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {signInMethod === 'email' ? 'Email Address' : 'Username'}
              </Text>
              <View style={styles.inputContainer}>
                {signInMethod === 'email' ? (
                  <Mail size={20} color="#6b7280" style={styles.inputIcon} />
                ) : (
                  <User size={20} color="#6b7280" style={styles.inputIcon} />
                )}
                <TextInput
                  style={styles.input}
                  placeholder={
                    signInMethod === 'email' ? 'Enter your email' : 'Enter your username'
                  }
                  value={identifier}
                  onChangeText={setIdentifier}
                  keyboardType={signInMethod === 'email' ? 'email-address' : 'default'}
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
              onPress={() => router.push('/auth/forgot-password')}
              style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signInButton, isLoading && styles.disabledButton]}
              onPress={onSignInPress}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.signInButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.verificationContainer}>
            <Text style={styles.verificationTitle}>Verify Your Identity</Text>
            <Text style={styles.verificationText}>
              We've sent a verification code to your email
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
              onPress={onVerifyPress}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify & Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPendingVerification(false)}
              style={styles.backToSignInButton}>
              <Text style={styles.backToSignInText}>Back to Sign In</Text>
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  signUpLink: {
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
  backToSignInButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  backToSignInText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
});