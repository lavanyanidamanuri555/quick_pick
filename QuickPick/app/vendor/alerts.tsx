import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Bell, MapPin, Clock, Users, TrendingUp, Eye, ShoppingCart } from 'lucide-react-native';

export default function VendorAlertsScreen() {
  const vendorAlerts = [
    {
      id: 1,
      title: 'Deal Performance Update',
      message: '25 buyers viewed your "Fresh Apples 50% Off" deal in the last hour',
      time: '5 minutes ago',
      type: 'performance',
      icon: TrendingUp,
    },
    {
      id: 2,
      title: 'High Interest Alert',
      message: '12 buyers within 2km radius are actively looking for your type of products',
      time: '20 minutes ago',
      type: 'location',
      icon: MapPin,
    },
    {
      id: 3,
      title: 'Deal Expiring Soon',
      message: 'Your "Electronics Bundle Sale" expires in 3 hours - consider extending?',
      time: '1 hour ago',
      type: 'expiry',
      icon: Clock,
    },
    {
      id: 4,
      title: 'New Followers',
      message: '8 new buyers started following your store after your recent deals',
      time: '2 hours ago',
      type: 'social',
      icon: Users,
    },
    {
      id: 5,
      title: 'Purchase Intent',
      message: '3 buyers have marked your "Coffee Bean Special" as interested',
      time: '4 hours ago',
      type: 'purchase',
      icon: ShoppingCart,
    },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'performance':
        return '#10b981';
      case 'location':
        return '#3b82f6';
      case 'expiry':
        return '#f59e0b';
      case 'social':
        return '#8b5cf6';
      case 'purchase':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getAlertBackground = (type: string) => {
    switch (type) {
      case 'performance':
        return '#ecfdf5';
      case 'location':
        return '#eff6ff';
      case 'expiry':
        return '#fffbeb';
      case 'social':
        return '#f5f3ff';
      case 'purchase':
        return '#fef2f2';
      default:
        return '#f9fafb';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Eye size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Total Views Today</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Users size={24} color="#10b981" />
            </View>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Interested Buyers</Text>
          </View>
        </View>

        <View style={styles.alertsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity>
              <Text style={styles.markAllRead}>Mark all read</Text>
            </TouchableOpacity>
          </View>

          {vendorAlerts.map((alert) => {
            const IconComponent = alert.icon;
            return (
              <TouchableOpacity
                key={alert.id}
                style={[
                  styles.alertCard,
                  { backgroundColor: getAlertBackground(alert.type) }
                ]}>
                <View style={styles.alertIconContainer}>
                  <IconComponent size={20} color={getAlertColor(alert.type)} />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Deal Performance Alerts</Text>
              <Text style={styles.settingDescription}>Get notified about views and interest</Text>
            </View>
            <View style={styles.toggleEnabled} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Buyer Location Alerts</Text>
              <Text style={styles.settingDescription}>Notify about nearby buyer activity</Text>
            </View>
            <View style={styles.toggleEnabled} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Deal Expiry Warnings</Text>
              <Text style={styles.settingDescription}>Alert before deals expire</Text>
            </View>
            <View style={styles.toggleEnabled} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>New Follower Notifications</Text>
              <Text style={styles.settingDescription}>Know when buyers follow your store</Text>
            </View>
            <View style={styles.toggleDisabled} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  alertsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  markAllRead: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  settingsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  toggleEnabled: {
    width: 48,
    height: 28,
    backgroundColor: '#3B82F6',
    borderRadius: 14,
  },
  toggleDisabled: {
    width: 48,
    height: 28,
    backgroundColor: '#d1d5db',
    borderRadius: 14,
  },
});