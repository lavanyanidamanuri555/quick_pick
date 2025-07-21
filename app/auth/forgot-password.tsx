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
import { useSignIn } from '@clerk/clerk-expo';
import { Mail, ArrowLeft, Key } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'reset'>('email');

  const onSendResetCode = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      await signIn.create({
        identifier: email,
      });

      const firstFactor = signIn.supportedFirstFactors.find(
        (f) => f.strategy === 'reset_password_email_code'
      );

      if (firstFactor) {
        await signIn.prepareFirstFactor({
          strategy: 'reset_password_email_code',
          emailAddressId: firstFactor.emailAddressId,
        });
        setStep('reset');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to send reset code');
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });

      if (result.status === 'complete') {
        Alert.alert(
          'Success',
          'Your password has been reset successfully!',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/auth/sign-in'),
            },
          ]
        );
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to reset password');
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
            {step === 'email' ? 'Forgot Password?' : 'Reset Password'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 'email'
              ? "Don't worry, we'll send you reset instructions"
              : 'Enter the code and your new password'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {step === 'email' ? (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <Mail size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.sendButton, isLoading && styles.disabledButton]}
                onPress={onSendResetCode}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.sendButtonText}>Send Reset Code</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Reset Code</Text>
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

              <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputContainer}>
                  <Key size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.resetButton, isLoading && styles.disabledButton]}
                onPress={onResetPassword}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.resetButtonText}>Reset Password</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setStep('email')}
                style={styles.backToEmailButton}>
                <Text style={styles.backToEmailText}>Back to Email</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Remember your password?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {step === 'email' && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>What happens next?</Text>
            <Text style={styles.infoText}>
              1. We'll send a 6-digit code to your email{'\n'}
              2. Enter the code along with your new password{'\n'}
              3. Your password will be updated securely
            </Text>
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
    lineHeight: 24,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  backToEmailButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  backToEmailText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
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
  infoContainer: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1e3a8a',
    lineHeight: 20,
  },
});