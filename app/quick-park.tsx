import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';

interface QuickParkSpot {
  id: string;
  name: string;
  address: string;
  distance: string;
  price: string;
  walkTime: string;
  availableSpots: number;
}

export default function QuickParkScreen() {
  console.log('QuickParkScreen rendered');
  
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const nearbySpots: QuickParkSpot[] = [
    {
      id: '1',
      name: 'Central Plaza',
      address: '123 Main St',
      distance: '0.1 km',
      price: '€2.50/hr',
      walkTime: '2 min walk',
      availableSpots: 3
    },
    {
      id: '2',
      name: 'Office Complex',
      address: '456 Business Ave',
      distance: '0.3 km',
      price: '€1.80/hr',
      walkTime: '4 min walk',
      availableSpots: 7
    },
    {
      id: '3',
      name: 'Shopping Center',
      address: '789 Retail Blvd',
      distance: '0.5 km',
      price: '€3.00/hr',
      walkTime: '6 min walk',
      availableSpots: 2
    },
  ];

  const handleQuickPark = (spot: QuickParkSpot) => {
    console.log('Quick parking at:', spot.name);
    setIsSearching(true);
    
    // Simulate finding and booking a spot
    setTimeout(() => {
      setIsSearching(false);
      Alert.alert(
        'Parking Confirmed!',
        `You've been assigned spot A${Math.floor(Math.random() * 20) + 1} at ${spot.name}.\n\nYou have 10 minutes to arrive.`,
        [
          {
            text: 'Get Directions',
            onPress: () => {
              Alert.alert('Navigation', `Opening directions to ${spot.name}`);
            }
          },
          {
            text: 'View Session',
            onPress: () => router.push('/sessions')
          }
        ]
      );
    }, 2000);
  };

  const handleSpotSelect = (spotId: string) => {
    setSelectedSpot(spotId);
  };

  if (isSearching) {
    return (
      <SafeAreaView style={commonStyles.wrapper}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingSpinner}>
            <Ionicons name="car" size={48} color={colors.primary} />
          </View>
          <Text style={styles.loadingTitle}>Finding Your Spot...</Text>
          <Text style={styles.loadingSubtitle}>
            We're securing the best available parking spot for you
          </Text>
        </View>
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
        <Text style={styles.headerTitle}>Quick Park</Text>
        <TouchableOpacity onPress={() => router.push('/map')} style={styles.mapButton}>
          <Ionicons name="map" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoIcon}>
            <Ionicons name="flash" size={32} color={colors.primary} />
          </View>
          <Text style={styles.infoTitle}>Park Instantly</Text>
          <Text style={styles.infoSubtitle}>
            Find and reserve parking near your current location in seconds
          </Text>
        </View>

        {/* Current Location */}
        <View style={styles.locationSection}>
          <View style={styles.locationHeader}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={styles.locationTitle}>Current Location</Text>
          </View>
          <Text style={styles.locationAddress}>Dam Square, Amsterdam</Text>
          <TouchableOpacity style={styles.changeLocationButton}>
            <Text style={styles.changeLocationText}>Change Location</Text>
          </TouchableOpacity>
        </View>

        {/* Available Spots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Nearby</Text>
          {nearbySpots.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              style={[
                styles.spotCard,
                selectedSpot === spot.id && styles.spotCardSelected
              ]}
              onPress={() => handleSpotSelect(spot.id)}
            >
              <View style={styles.spotHeader}>
                <View style={styles.spotInfo}>
                  <Text style={styles.spotName}>{spot.name}</Text>
                  <Text style={styles.spotAddress}>{spot.address}</Text>
                </View>
                <View style={styles.spotBadge}>
                  <Text style={styles.spotBadgeText}>{spot.availableSpots} spots</Text>
                </View>
              </View>
              
              <View style={styles.spotDetails}>
                <View style={styles.spotDetailItem}>
                  <Ionicons name="walk" size={16} color={colors.textSecondary} />
                  <Text style={styles.spotDetailText}>{spot.distance} • {spot.walkTime}</Text>
                </View>
                <View style={styles.spotDetailItem}>
                  <Ionicons name="card" size={16} color={colors.textSecondary} />
                  <Text style={styles.spotDetailText}>{spot.price}</Text>
                </View>
              </View>

              <View style={styles.spotActions}>
                <TouchableOpacity
                  style={styles.parkButton}
                  onPress={() => handleQuickPark(spot)}
                >
                  <Ionicons name="flash" size={20} color={colors.white} />
                  <Text style={styles.parkButtonText}>Park Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Quick Park Works</Text>
          <View style={styles.howItWorksCard}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Choose a Spot</Text>
                <Text style={styles.stepDescription}>
                  Select from available parking spots near you
                </Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Instant Reservation</Text>
                <Text style={styles.stepDescription}>
                  We'll secure your spot immediately
                </Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Park & Pay</Text>
                <Text style={styles.stepDescription}>
                  Drive to your spot and pay through the app
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Park Benefits</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Ionicons name="time" size={24} color={colors.primary} />
              <Text style={styles.featureTitle}>Save Time</Text>
              <Text style={styles.featureDescription}>No more circling for parking</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
              <Text style={styles.featureTitle}>Guaranteed</Text>
              <Text style={styles.featureDescription}>Your spot is reserved</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="cash" size={24} color={colors.primary} />
              <Text style={styles.featureTitle}>Best Prices</Text>
              <Text style={styles.featureDescription}>Competitive rates</Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="phone-portrait" size={24} color={colors.primary} />
              <Text style={styles.featureTitle}>Digital Access</Text>
              <Text style={styles.featureDescription}>Open gates with your phone</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  loadingSpinner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  infoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  infoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  locationSection: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  locationAddress: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  changeLocationButton: {
    alignSelf: 'flex-start',
  },
  changeLocationText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  spotCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  spotCardSelected: {
    borderColor: colors.primary,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  spotAddress: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  spotBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  spotBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  spotDetails: {
    marginBottom: 16,
  },
  spotDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  spotDetailText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  spotActions: {
    alignItems: 'flex-end',
  },
  parkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  parkButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  howItWorksCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});