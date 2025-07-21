import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Search, MapPin, Clock, Percent, Heart, Filter } from 'lucide-react-native';

export default function BuyerBrowseDealsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock deals posted by vendors
  const availableDeals = [
    {
      id: 1,
      vendorName: 'Fresh Market Store',
      itemName: 'Fresh Apples',
      originalPrice: 100,
      discount: 50,
      quantity: '15 kg left',
      location: 'Downtown Market',
      distance: '0.8 km',
      expiresIn: '2 hours',
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Food',
      rating: 4.8,
      isLiked: false,
    },
    {
      id: 2,
      vendorName: 'Tech Hub Electronics',
      itemName: 'Smartphone Accessories Bundle',
      originalPrice: 200,
      discount: 30,
      quantity: '8 bundles left',
      location: 'Shopping Mall',
      distance: '1.2 km',
      expiresIn: '5 hours',
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Electronics',
      rating: 4.6,
      isLiked: true,
    },
    {
      id: 3,
      vendorName: 'Coffee Corner',
      itemName: 'Premium Coffee Beans',
      originalPrice: 80,
      discount: 25,
      quantity: '20 bags left',
      location: 'Business District',
      distance: '2.1 km',
      expiresIn: '1 day',
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Food',
      rating: 4.9,
      isLiked: false,
    },
    {
      id: 4,
      vendorName: 'Fashion Outlet',
      itemName: 'Summer Clothing Collection',
      originalPrice: 150,
      discount: 40,
      quantity: '25 pieces left',
      location: 'Fashion Street',
      distance: '1.8 km',
      expiresIn: '3 days',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fashion',
      rating: 4.5,
      isLiked: false,
    },
  ];

  const categories = ['All', 'Food', 'Electronics', 'Fashion', 'Home', 'Sports'];

  const calculateDiscountedPrice = (originalPrice: number, discount: number) => {
    return originalPrice - (originalPrice * discount / 100);
  };

  const filteredDeals = availableDeals.filter(deal => {
    const matchesSearch = deal.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Discover Amazing Deals! 🛍️</Text>
          <Text style={styles.welcomeSubtext}>Find the best offers from local vendors near you</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search deals, vendors, products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#10b981" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryItem,
                  selectedCategory === category && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category)}>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.dealsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredDeals.length} Deals Available
            </Text>
            <Text style={styles.sectionSubtitle}>Updated just now</Text>
          </View>

          {filteredDeals.map((deal) => (
            <TouchableOpacity key={deal.id} style={styles.dealCard}>
              <Image source={{ uri: deal.image }} style={styles.dealImage} />
              
              <View style={styles.dealContent}>
                <View style={styles.dealHeader}>
                  <View style={styles.dealTitleContainer}>
                    <Text style={styles.dealTitle}>{deal.itemName}</Text>
                    <Text style={styles.vendorName}>{deal.vendorName}</Text>
                  </View>
                  <TouchableOpacity style={styles.likeButton}>
                    <Heart 
                      size={20} 
                      color={deal.isLiked ? "#ef4444" : "#6b7280"} 
                      fill={deal.isLiked ? "#ef4444" : "none"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.discountedPrice}>
                    ₹{calculateDiscountedPrice(deal.originalPrice, deal.discount)}
                  </Text>
                  <Text style={styles.originalPrice}>₹{deal.originalPrice}</Text>
                  <View style={styles.discountBadge}>
                    <Percent size={12} color="#ffffff" />
                    <Text style={styles.discountText}>{deal.discount}% OFF</Text>
                  </View>
                </View>

                <View style={styles.dealDetails}>
                  <View style={styles.detailItem}>
                    <MapPin size={14} color="#6b7280" />
                    <Text style={styles.detailText}>{deal.location} • {deal.distance}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={14} color="#6b7280" />
                    <Text style={styles.detailText}>Expires in {deal.expiresIn}</Text>
                  </View>
                </View>

                <View style={styles.dealFooter}>
                  <Text style={styles.quantityText}>{deal.quantity}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>⭐ {deal.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredDeals.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No deals found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or category filter
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
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  welcomeSection: {
    backgroundColor: '#10b981',
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryItem: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategory: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  dealsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  dealCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  dealContent: {
    padding: 16,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dealTitleContainer: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 14,
    color: '#6b7280',
  },
  likeButton: {
    padding: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#6b7280',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 4,
  },
  dealDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f59e0b',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});