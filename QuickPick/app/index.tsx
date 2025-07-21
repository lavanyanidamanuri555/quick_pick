import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Store, ShoppingBag, Zap } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Zap size={48} color="#3B82F6" />
          </View>
          <Text style={styles.title}>QuickPick</Text>
          <Text style={styles.subtitle}>
            Connect vendors with buyers for instant deals
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionCard, styles.vendorCard]}
            onPress={() => router.push('/auth?type=vendor')}>
            <View style={styles.optionIcon}>
              <Store size={32} color="#ffffff" />
            </View>
            <Text style={styles.optionTitle}>I'm a Vendor</Text>
            <Text style={styles.optionDescription}>
              Post deals and reach nearby customers
            </Text>
            <View style={styles.optionFeatures}>
              <Text style={styles.featureText}>• Post instant deals</Text>
              <Text style={styles.featureText}>• Alert nearby buyers</Text>
              <Text style={styles.featureText}>• Manage inventory</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, styles.buyerCard]}
            onPress={() => router.push('/auth?type=buyer')}>
            <View style={styles.optionIcon}>
              <ShoppingBag size={32} color="#ffffff" />
            </View>
            <Text style={styles.optionTitle}>I'm a Buyer</Text>
            <Text style={styles.optionDescription}>
              Discover amazing deals around you
            </Text>
            <View style={styles.optionFeatures}>
              <Text style={styles.featureText}>• Browse local deals</Text>
              <Text style={styles.featureText}>• Get instant alerts</Text>
              <Text style={styles.featureText}>• Save favorites</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Join thousands of vendors and buyers already using QuickPick
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 20,
    marginBottom: 32,
  },
  optionCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  vendorCard: {
    backgroundColor: '#3B82F6',
  },
  buyerCard: {
    backgroundColor: '#10b981',
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 24,
  },
  optionFeatures: {
    gap: 4,
  },
  featureText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});