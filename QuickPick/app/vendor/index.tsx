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
  Image,
} from 'react-native';
import { Package, Hash, Percent, Clock, MapPin, Camera, Upload, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function VendorPostDealScreen() {
  const [dealData, setDealData] = useState({
    itemName: '',
    quantity: '',
    discount: '',
    expiryDate: '',
    expiryTime: '',
    location: '',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Popular items for vendors to post
  const popularItems = [
    'Fresh Fruits & Vegetables',
    'Electronics & Gadgets',
    'Coffee & Beverages',
    'Handmade Crafts',
    'Books & Stationery',
    'Clothing & Accessories',
    'Home & Kitchen Items',
    'Sports Equipment'
  ];

  // Recent deals posted by this vendor
  const myRecentDeals = [
    { name: 'Fresh Apples 50% Off', quantity: '20 kg', discount: '50%', status: 'Active', views: 45 },
    { name: 'Electronics Bundle Sale', quantity: '15 items', discount: '30%', status: 'Expiring Soon', views: 23 },
    { name: 'Coffee Bean Special', quantity: '50 bags', discount: '25%', status: 'Sold Out', views: 67 }
  ];

  const handleImageUpload = () => {
    Alert.alert(
      'Upload Product Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => simulateImageUpload('camera') },
        { text: 'Gallery', onPress: () => simulateImageUpload('gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const simulateImageUpload = (source: string) => {
    setSelectedImage(`https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400`);
    Alert.alert('Success', `Product image selected from ${source}!`);
  };

  const handlePostDeal = () => {
    if (!dealData.itemName || !dealData.quantity || !dealData.discount) {
      Alert.alert('Error', 'Please fill in all required fields (Item Name, Quantity, Discount)');
      return;
    }
    Alert.alert(
      'Deal Posted Successfully! 🎉',
      `Your "${dealData.itemName}" deal is now live and will alert nearby buyers within 5km radius.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setDealData({
              itemName: '',
              quantity: '',
              discount: '',
              expiryDate: '',
              expiryTime: '',
              location: '',
            });
            setSelectedImage(null);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, Vendor! 👋</Text>
          <Text style={styles.welcomeSubtext}>Post your deals and reach customers instantly</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Create New Deal</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Item Name *</Text>
            <View style={styles.quickSelectContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {popularItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickSelectItem}
                    onPress={() => setDealData({ ...dealData, itemName: item })}>
                    <Text style={styles.quickSelectText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.inputContainer}>
              <Package size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter item name"
                value={dealData.itemName}
                onChangeText={(text) => setDealData({ ...dealData, itemName: text })}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity *</Text>
            <View style={styles.inputContainer}>
              <Hash size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g., 50 kg, 20 pieces, 100 units"
                value={dealData.quantity}
                onChangeText={(text) => setDealData({ ...dealData, quantity: text })}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Discount % *</Text>
            <View style={styles.inputContainer}>
              <Percent size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter discount percentage"
                value={dealData.discount}
                onChangeText={(text) => setDealData({ ...dealData, discount: text })}
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeInput}>
              <Text style={styles.label}>Expiry Date</Text>
              <View style={styles.inputContainer}>
                <Clock size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  value={dealData.expiryDate}
                  onChangeText={(text) => setDealData({ ...dealData, expiryDate: text })}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View style={styles.dateTimeInput}>
              <Text style={styles.label}>Expiry Time</Text>
              <View style={styles.inputContainer}>
                <Clock size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="HH:MM"
                  value={dealData.expiryTime}
                  onChangeText={(text) => setDealData({ ...dealData, expiryTime: text })}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your store location"
                value={dealData.location}
                onChangeText={(text) => setDealData({ ...dealData, location: text })}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Photo</Text>
            <TouchableOpacity style={styles.imageUploadContainer} onPress={handleImageUpload}>
              {selectedImage ? (
                <View style={styles.imagePreview}>
                  <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
                  <TouchableOpacity style={styles.changeImageButton} onPress={handleImageUpload}>
                    <Camera size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Upload size={32} color="#6b7280" />
                  <Text style={styles.uploadText}>Tap to upload product photo</Text>
                  <Text style={styles.uploadSubtext}>JPG, PNG up to 5MB</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.postButton} onPress={handlePostDeal}>
            <Text style={styles.postButtonText}>Post Deal 🚀</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.alertSection}>
          <View style={styles.alertContainer}>
            <AlertCircle size={24} color="#F97316" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>📢 Deal Alert System</Text>
              <Text style={styles.alertText}>
                This deal will automatically notify all buyers within a 5 km radius and appear in their deal feed.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recentDealsSection}>
          <Text style={styles.sectionTitle}>My Recent Deals</Text>
          {myRecentDeals.map((deal, index) => (
            <View key={index} style={styles.dealCard}>
              <View style={styles.dealInfo}>
                <Text style={styles.dealName}>{deal.name}</Text>
                <Text style={styles.dealDetails}>{deal.quantity} • {deal.discount} off • {deal.views} views</Text>
              </View>
              <View style={[styles.statusBadge, 
                deal.status === 'Active' && styles.statusActive,
                deal.status === 'Expiring Soon' && styles.statusWarning,
                deal.status === 'Sold Out' && styles.statusInactive
              ]}>
                <Text style={styles.statusText}>{deal.status}</Text>
              </View>
            </View>
          ))}
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
  welcomeSection: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
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
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateTimeInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  imageUploadContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  imagePreview: {
    position: 'relative',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  changeImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  postButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  alertSection: {
    marginBottom: 16,
  },
  alertContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff7ed',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F97316',
  },
  alertContent: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9a3412',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#7c2d12',
    lineHeight: 20,
  },
  quickSelectContainer: {
    marginBottom: 8,
  },
  quickSelectItem: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  quickSelectText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  recentDealsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  dealCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dealInfo: {
    flex: 1,
  },
  dealName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  dealDetails: {
    fontSize: 12,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#dcfce7',
  },
  statusWarning: {
    backgroundColor: '#fef3c7',
  },
  statusInactive: {
    backgroundColor: '#f3f4f6',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374151',
  },
});