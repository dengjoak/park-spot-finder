import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  price: string;
  distance: string;
  availability: 'available' | 'occupied' | 'reserved';
  rating: number;
  features: string[];
}

export default function MapScreen() {
  console.log('MapScreen rendered');
  
  const [searchText, setSearchText] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 52.3676,
    longitude: 4.9041,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const parkingSpots: ParkingSpot[] = [
    {
      id: '1',
      name: 'Central Plaza',
      address: '123 Main St, Amsterdam',
      latitude: 52.3676,
      longitude: 4.9041,
      price: '€2.50/hr',
      distance: '0.2 km',
      availability: 'available',
      rating: 4.5,
      features: ['Covered', 'Security', 'EV Charging']
    },
    {
      id: '2',
      name: 'Office Complex',
      address: '456 Business Ave, Amsterdam',
      latitude: 52.3686,
      longitude: 4.9051,
      price: '€1.80/hr',
      distance: '0.5 km',
      availability: 'available',
      rating: 4.2,
      features: ['24/7 Access', 'Security']
    },
    {
      id: '3',
      name: 'Shopping Center',
      address: '789 Retail Blvd, Amsterdam',
      latitude: 52.3666,
      longitude: 4.9031,
      price: '€3.00/hr',
      distance: '0.8 km',
      availability: 'reserved',
      rating: 4.7,
      features: ['Covered', 'Shopping Access']
    },
    {
      id: '4',
      name: 'Hotel Parking',
      address: '321 Hotel St, Amsterdam',
      latitude: 52.3696,
      longitude: 4.9061,
      price: '€2.20/hr',
      distance: '1.1 km',
      availability: 'available',
      rating: 4.3,
      features: ['Valet', 'Luxury']
    }
  ];

  const getMarkerColor = (availability: string) => {
    switch (availability) {
      case 'available': return colors.primary;
      case 'occupied': return colors.error;
      case 'reserved': return colors.warning;
      default: return colors.grey;
    }
  };

  const handleSpotPress = (spot: ParkingSpot) => {
    console.log('Spot pressed:', spot.name);
    setSelectedSpot(spot);
  };

  const handleBookSpot = (spot: ParkingSpot) => {
    console.log('Booking spot:', spot.name);
    router.push({
      pathname: '/booking',
      params: { spotId: spot.id, spotName: spot.name, price: spot.price }
    });
  };

  const handleNavigateToSpot = (spot: ParkingSpot) => {
    console.log('Navigate to spot:', spot.name);
    Alert.alert('Navigation', `Opening navigation to ${spot.name}`);
  };

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={commonStyles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Find Parking</Text>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
            <Ionicons name="options" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.webMapContainer}>
          <Text style={styles.webMapText}>🗺️ Interactive Map</Text>
          <Text style={styles.webMapSubtext}>Maps are not supported on web in Natively</Text>
          <Text style={styles.webMapSubtext}>Please use the mobile app for full map functionality</Text>
        </View>

        <ScrollView style={styles.spotsList}>
          {parkingSpots.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              style={styles.spotCard}
              onPress={() => handleSpotPress(spot)}
            >
              <View style={styles.spotHeader}>
                <Text style={styles.spotName}>{spot.name}</Text>
                <View style={[styles.availabilityBadge, { backgroundColor: getMarkerColor(spot.availability) }]}>
                  <Text style={styles.availabilityText}>{spot.availability}</Text>
                </View>
              </View>
              <Text style={styles.spotAddress}>{spot.address}</Text>
              <View style={styles.spotDetails}>
                <Text style={styles.spotPrice}>{spot.price}</Text>
                <Text style={styles.spotDistance}>{spot.distance}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color={colors.warning} />
                  <Text style={styles.ratingText}>{spot.rating}</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresContainer}>
                {spot.features.map((feature, index) => (
                  <View key={index} style={styles.featureTag}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={[styles.bookButton, spot.availability !== 'available' && styles.bookButtonDisabled]}
                onPress={() => handleBookSpot(spot)}
                disabled={spot.availability !== 'available'}
              >
                <Text style={styles.bookButtonText}>
                  {spot.availability === 'available' ? 'Book Now' : 'Unavailable'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Parking</Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
          <Ionicons name="options" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for parking..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="locate" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={mapRegion}
          onRegionChangeComplete={setMapRegion}
        >
          {parkingSpots.map((spot) => (
            <Marker
              key={spot.id}
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude,
              }}
              onPress={() => handleSpotPress(spot)}
            >
              <View style={[styles.markerContainer, { backgroundColor: getMarkerColor(spot.availability) }]}>
                <Text style={styles.markerPrice}>{spot.price}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Selected Spot Details */}
      {selectedSpot && (
        <View style={styles.spotDetailsContainer}>
          <View style={styles.spotDetailsHeader}>
            <View>
              <Text style={styles.selectedSpotName}>{selectedSpot.name}</Text>
              <Text style={styles.selectedSpotAddress}>{selectedSpot.address}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedSpot(null)}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.spotDetailsInfo}>
            <View style={styles.spotDetailItem}>
              <Text style={styles.spotDetailLabel}>Price</Text>
              <Text style={styles.spotDetailValue}>{selectedSpot.price}</Text>
            </View>
            <View style={styles.spotDetailItem}>
              <Text style={styles.spotDetailLabel}>Distance</Text>
              <Text style={styles.spotDetailValue}>{selectedSpot.distance}</Text>
            </View>
            <View style={styles.spotDetailItem}>
              <Text style={styles.spotDetailLabel}>Rating</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={colors.warning} />
                <Text style={styles.spotDetailValue}>{selectedSpot.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.spotActions}>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => handleNavigateToSpot(selectedSpot)}
            >
              <Ionicons name="navigate" size={20} color={colors.primary} />
              <Text style={styles.navigateButtonText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bookButton, selectedSpot.availability !== 'available' && styles.bookButtonDisabled]}
              onPress={() => handleBookSpot(selectedSpot)}
              disabled={selectedSpot.availability !== 'available'}
            >
              <Text style={styles.bookButtonText}>
                {selectedSpot.availability === 'available' ? 'Book Now' : 'Unavailable'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  locationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webMapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    margin: 20,
    borderRadius: 12,
  },
  webMapText: {
    fontSize: 24,
    color: colors.text,
    marginBottom: 8,
  },
  webMapSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  markerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPrice: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  spotDetailsContainer: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: 300,
  },
  spotDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  selectedSpotName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  selectedSpotAddress: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  spotDetailsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  spotDetailItem: {
    alignItems: 'center',
  },
  spotDetailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  spotDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  spotActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  navigateButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bookButton: {
    flex: 2,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: colors.grey,
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  spotsList: {
    flex: 1,
    backgroundColor: colors.background,
  },
  spotCard: {
    backgroundColor: colors.card,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spotName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  spotAddress: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  spotDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  spotPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 16,
  },
  spotDistance: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 16,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  featureText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
});