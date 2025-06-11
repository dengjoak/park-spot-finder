import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';

export default function BookingScreen() {
  console.log('BookingScreen rendered');
  
  const params = useLocalSearchParams();
  const { spotId, spotName, price } = params;
  
  const [selectedDuration, setSelectedDuration] = useState('2h');
  const [selectedDate, setSelectedDate] = useState('now');
  const [parkingType, setParkingType] = useState<'now' | 'future'>('now');

  const durations = [
    { id: '1h', label: '1 Hour', price: 2.50 },
    { id: '2h', label: '2 Hours', price: 5.00 },
    { id: '4h', label: '4 Hours', price: 9.50 },
    { id: '8h', label: '8 Hours', price: 18.00 },
    { id: 'day', label: 'Full Day', price: 25.00 },
  ];

  const dateOptions = [
    { id: 'now', label: 'Park Now', time: 'Immediate' },
    { id: 'hour', label: 'In 1 Hour', time: '14:30' },
    { id: 'evening', label: 'This Evening', time: '18:00' },
    { id: 'tomorrow', label: 'Tomorrow', time: '09:00' },
  ];

  const selectedDurationData = durations.find(d => d.id === selectedDuration);
  const serviceFee = 0.50;
  const totalPrice = (selectedDurationData?.price || 0) + serviceFee;

  const handleBooking = () => {
    console.log('Booking confirmed:', { spotId, spotName, selectedDuration, selectedDate, totalPrice });
    
    Alert.alert(
      'Booking Confirmed!',
      `Your parking spot at ${spotName} has been booked for ${selectedDurationData?.label.toLowerCase()}.`,
      [
        {
          text: 'View Session',
          onPress: () => router.push('/sessions')
        }
      ]
    );
  };

  const handlePayment = () => {
    console.log('Processing payment...');
    Alert.alert(
      'Payment Required',
      'This would normally open the payment gateway.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Pay Now',
          onPress: handleBooking
        }
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Parking</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Spot Info */}
        <View style={styles.spotInfoCard}>
          <View style={styles.spotHeader}>
            <Ionicons name="location" size={24} color={colors.primary} />
            <View style={styles.spotDetails}>
              <Text style={styles.spotName}>{spotName}</Text>
              <Text style={styles.spotPrice}>{price}</Text>
            </View>
          </View>
        </View>

        {/* Parking Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>When do you want to park?</Text>
          <View style={styles.parkingTypeContainer}>
            <TouchableOpacity
              style={[styles.parkingTypeButton, parkingType === 'now' && styles.parkingTypeButtonActive]}
              onPress={() => setParkingType('now')}
            >
              <Ionicons 
                name="flash" 
                size={24} 
                color={parkingType === 'now' ? colors.white : colors.primary} 
              />
              <Text style={[styles.parkingTypeText, parkingType === 'now' && styles.parkingTypeTextActive]}>
                Park Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.parkingTypeButton, parkingType === 'future' && styles.parkingTypeButtonActive]}
              onPress={() => setParkingType('future')}
            >
              <Ionicons 
                name="calendar" 
                size={24} 
                color={parkingType === 'future' ? colors.white : colors.primary} 
              />
              <Text style={[styles.parkingTypeText, parkingType === 'future' && styles.parkingTypeTextActive]}>
                Book for Later
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Selection (if future parking) */}
        {parkingType === 'future' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.optionsGrid}>
              {dateOptions.slice(1).map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.optionCard, selectedDate === option.id && styles.optionCardActive]}
                  onPress={() => setSelectedDate(option.id)}
                >
                  <Text style={[styles.optionLabel, selectedDate === option.id && styles.optionLabelActive]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.optionTime, selectedDate === option.id && styles.optionTimeActive]}>
                    {option.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Duration Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Duration</Text>
          <View style={styles.optionsGrid}>
            {durations.map((duration) => (
              <TouchableOpacity
                key={duration.id}
                style={[styles.optionCard, selectedDuration === duration.id && styles.optionCardActive]}
                onPress={() => setSelectedDuration(duration.id)}
              >
                <Text style={[styles.optionLabel, selectedDuration === duration.id && styles.optionLabelActive]}>
                  {duration.label}
                </Text>
                <Text style={[styles.optionPrice, selectedDuration === duration.id && styles.optionPriceActive]}>
                  €{duration.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pricing Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing Breakdown</Text>
          <View style={styles.pricingCard}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Parking ({selectedDurationData?.label})</Text>
              <Text style={styles.pricingValue}>€{selectedDurationData?.price.toFixed(2)}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Service Fee</Text>
              <Text style={styles.pricingValue}>€{serviceFee.toFixed(2)}</Text>
            </View>
            <View style={styles.pricingDivider} />
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabelTotal}>Total</Text>
              <Text style={styles.pricingValueTotal}>€{totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Included Features</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Secure Access</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="time" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Flexible Timing</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="card" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Digital Payment</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="receipt" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Digital Receipt</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.bookingFooter}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>€{totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handlePayment}>
          <Text style={styles.bookButtonText}>Confirm & Pay</Text>
        </TouchableOpacity>
      </View>
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
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  spotInfoCard: {
    backgroundColor: colors.card,
    margin: 20,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  spotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotDetails: {
    marginLeft: 12,
    flex: 1,
  },
  spotName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  spotPrice: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  parkingTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  parkingTypeButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  parkingTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  parkingTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  parkingTypeTextActive: {
    color: colors.white,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  optionLabelActive: {
    color: colors.white,
  },
  optionTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  optionTimeActive: {
    color: colors.white,
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  optionPriceActive: {
    color: colors.white,
  },
  pricingCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pricingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  pricingValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  pricingLabelTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  pricingValueTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  pricingDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  featuresContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  bookingFooter: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});