import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Bell, MapPin, Clock, Tag, TrendingDown, Zap } from 'lucide-react-native';

export default function BuyerAlertsScreen() {
  const buyerAlerts = [
    {
      id: 1,
      title: 'New Deal Alert',
      message: 'Fresh Market Store posted "Organic Vegetables 40% Off" just 0.5km away!',
      time: '2 minutes ago',
      type: 'new_deal',
      icon: Zap,
    },
    {
      id: 2,
      title: 'Price Drop Alert',
      message: 'Electronics Bundle at Tech Hub dropped from 30% to 45% off!',
      time: '15 minutes ago',
      type: 'price_drop',
      icon: TrendingDown,
    },
    {
      id: 3,
      title: 'Location Alert',
      message: '3 new deals available within 1km of your current location',
      time: '30 minutes ago',
      type: 'location',
      icon: MapPin,
    },
    {
      id: 4,
      title: 'Deal Ending Soon',
      message: 'Your saved "Coffee Bean Special" expires in 1 hour - grab it now!',
      time: '45 minutes ago',
      type: 'expiry',
      icon: Clock,
    },
    {
      id: 5,
      title: 'Category Alert',
      message: '5 new Fashion deals posted by vendors you follow',
      time: '2 hours ago',
      type: 'category',
      icon: Tag,
    },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'new_deal':
        return '#10b981';
      case 'price_drop':
        return '#ef4444';
      case 'location':
        return '#3b82f6';
      case 'expiry':
        return '#f59e0b';
      case 'category':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getAlertBackground = (type: string) => {
    switch (type) {
      case 'new_deal':
        return '#ecfdf5';
      case 'price_drop':
        return '#fef2f2';
      case 'location':
        return '#eff6ff';
      case 'expiry':
        return '#fffbeb';
      case 'category':
        return '#f5f3ff';
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
              <Bell size={24} color="#10b981" />
            </View>
            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>Active Alerts</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Zap size={24} color="#3b82f6" />
            </View>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>New Deals Today</Text>
          </View>
        </View>

        <View style={styles.alertsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.markAllRead}>Mark all read</Text>
            </TouchableOpacity>
          </View>

          {buyerAlerts.map((alert) => {
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
          <Text style={styles.sectionTitle}>Alert Preferences</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>New Deal Notifications</Text>
              <Text style={styles.settingDescription}>Get notified about new deals near you</Text>
            </View>
            <View style={styles.toggleEnabled} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Price Drop Alerts</Text>
              <Text style={styles.settingDescription}>Alert when saved deals get better discounts</Text>
            </View>
            <View style={styles.toggleEnabled} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Location-Based Alerts</Text>
              <Text style={styles.settingDescription}>Notify about deals within your radius</Text>
            </View>
            <View style={styles.toggleEnabled} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Deal Expiry Warnings</Text>
              <Text style={styles.settingDescription}>Remind before saved deals expire</Text>
            </View>
            <View style={styles.toggleDisabled} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Category Preferences</Text>
              <Text style={styles.settingDescription}>Only notify about selected categories</Text>
            </View>
            <View style={styles.toggleDisabled} />
          </TouchableOpacity>
        </View>

        <View style={styles.radiusSection}>
          <Text style={styles.sectionTitle}>Alert Radius</Text>
          <Text style={styles.radiusDescription}>
            Get notified about deals within this distance from your location
          </Text>
          
          <View style={styles.radiusOptions}>
            {['1 km', '2 km', '5 km', '10 km'].map((radius, index) => (
              <TouchableOpacity
                key={radius}
                style={[
                  styles.radiusOption,
                  index === 2 && styles.selectedRadiusOption
                ]}>
                <Text style={[
                  styles.radiusText,
                  index === 2 && styles.selectedRadiusText
                ]}>
                  {radius}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
    color: '#10b981',
    fontWeight: '500',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
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
    marginBottom: 20,
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
    backgroundColor: '#10b981',
    borderRadius: 14,
  },
  toggleDisabled: {
    width: 48,
    height: 28,
    backgroundColor: '#d1d5db',
    borderRadius: 14,
  },
  radiusSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },
  radiusDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  radiusOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  radiusOption: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedRadiusOption: {
    backgroundColor: '#10b981',
  },
  radiusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedRadiusText: {
    color: '#ffffff',
  },
});