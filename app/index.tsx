import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';

export default function HomeScreen() {
  console.log('HomeScreen rendered');

  const quickActions = [
    { id: 1, title: 'Find Parking', icon: 'search', route: '/map' },
    { id: 2, title: 'Quick Park', icon: 'flash', route: '/quick-park' },
    { id: 3, title: 'My Sessions', icon: 'time', route: '/sessions' },
    { id: 4, title: 'Account', icon: 'person', route: '/account' },
  ];

  const recentSpots = [
    { id: 1, name: 'Central Plaza', address: '123 Main St', price: '€2.50/hr', distance: '0.2 km' },
    { id: 2, name: 'Office Complex', address: '456 Business Ave', price: '€1.80/hr', distance: '0.5 km' },
    { id: 3, name: 'Shopping Center', address: '789 Retail Blvd', price: '€3.00/hr', distance: '0.8 km' },
  ];

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <StatusBar style="light" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.subtitle}>Find your perfect parking spot</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => router.push(action.route)}
                activeOpacity={0.7}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name={action.icon as any} size={24} color={colors.primary} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Active Session Card */}
        <View style={styles.section}>
          <View style={styles.activeSessionCard}>
            <View style={styles.sessionHeader}>
              <Ionicons name="car" size={20} color={colors.primary} />
              <Text style={styles.sessionTitle}>Active Session</Text>
            </View>
            <Text style={styles.sessionLocation}>Central Plaza - Spot A12</Text>
            <View style={styles.sessionDetails}>
              <Text style={styles.sessionTime}>2h 15m remaining</Text>
              <TouchableOpacity style={styles.extendButton}>
                <Text style={styles.extendButtonText}>Extend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Spots */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Spots</Text>
            <TouchableOpacity onPress={() => router.push('/map')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentSpots.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              style={styles.spotCard}
              onPress={() => router.push('/map')}
              activeOpacity={0.7}
            >
              <View style={styles.spotInfo}>
                <Text style={styles.spotName}>{spot.name}</Text>
                <Text style={styles.spotAddress}>{spot.address}</Text>
                <View style={styles.spotDetails}>
                  <Text style={styles.spotPrice}>{spot.price}</Text>
                  <Text style={styles.spotDistance}>{spot.distance}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
            <Ionicons name="home" size={24} color={colors.primary} />
            <Text style={[styles.navText, { color: colors.primary }]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/map')}>
            <Ionicons name="map" size={24} color={colors.textSecondary} />
            <Text style={styles.navText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/sessions')}>
            <Ionicons name="time" size={24} color={colors.textSecondary} />
            <Text style={styles.navText}>Sessions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/account')}>
            <Ionicons name="person" size={24} color={colors.textSecondary} />
            <Text style={styles.navText}>Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
    color: colors.text,
  },
  seeAllText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  activeSessionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  sessionLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionTime: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  extendButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  extendButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  spotCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  spotAddress: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  spotDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 12,
  },
  spotDistance: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
});