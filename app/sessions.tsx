import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';

interface ParkingSession {
  id: string;
  spotName: string;
  address: string;
  startTime: string;
  endTime: string;
  duration: string;
  price: string;
  status: 'active' | 'completed' | 'upcoming';
  timeRemaining?: string;
  spotNumber?: string;
}

export default function SessionsScreen() {
  console.log('SessionsScreen rendered');
  
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeSessions: ParkingSession[] = [
    {
      id: '1',
      spotName: 'Central Plaza',
      address: '123 Main St, Amsterdam',
      startTime: '12:30',
      endTime: '16:30',
      duration: '4h',
      price: '€9.50',
      status: 'active',
      timeRemaining: '2h 15m',
      spotNumber: 'A12'
    },
  ];

  const upcomingSessions: ParkingSession[] = [
    {
      id: '2',
      spotName: 'Office Complex',
      address: '456 Business Ave, Amsterdam',
      startTime: '18:00',
      endTime: '22:00',
      duration: '4h',
      price: '€7.20',
      status: 'upcoming',
      spotNumber: 'B05'
    },
  ];

  const pastSessions: ParkingSession[] = [
    {
      id: '3',
      spotName: 'Shopping Center',
      address: '789 Retail Blvd, Amsterdam',
      startTime: '10:00',
      endTime: '14:00',
      duration: '4h',
      price: '€12.00',
      status: 'completed'
    },
    {
      id: '4',
      spotName: 'Hotel Parking',
      address: '321 Hotel St, Amsterdam',
      startTime: '09:30',
      endTime: '11:30',
      duration: '2h',
      price: '€5.00',
      status: 'completed'
    },
    {
      id: '5',
      spotName: 'Central Plaza',
      address: '123 Main St, Amsterdam',
      startTime: '14:00',
      endTime: '18:00',
      duration: '4h',
      price: '€9.50',
      status: 'completed'
    },
  ];

  const handleExtendSession = (sessionId: string) => {
    console.log('Extending session:', sessionId);
    Alert.alert(
      'Extend Parking',
      'How long would you like to extend your parking?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '30 min (+€1.25)', onPress: () => console.log('Extended 30 min') },
        { text: '1 hour (+€2.50)', onPress: () => console.log('Extended 1 hour') },
        { text: '2 hours (+€5.00)', onPress: () => console.log('Extended 2 hours') },
      ]
    );
  };

  const handleEndSession = (sessionId: string) => {
    console.log('Ending session:', sessionId);
    Alert.alert(
      'End Session',
      'Are you sure you want to end your parking session early?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'End Session', onPress: () => console.log('Session ended'), style: 'destructive' },
      ]
    );
  };

  const handleNavigateToSpot = (session: ParkingSession) => {
    console.log('Navigate to:', session.spotName);
    Alert.alert('Navigation', `Opening navigation to ${session.spotName}`);
  };

  const handleOpenGate = (session: ParkingSession) => {
    console.log('Opening gate for:', session.spotName);
    Alert.alert('Digital Access', 'Gate is opening...\n\nPlease proceed to your parking spot.');
  };

  const renderSessionCard = (session: ParkingSession) => (
    <View key={session.id} style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionSpotName}>{session.spotName}</Text>
          <Text style={styles.sessionAddress}>{session.address}</Text>
          {session.spotNumber && (
            <Text style={styles.sessionSpotNumber}>Spot: {session.spotNumber}</Text>
          )}
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(session.status) }]}>
          <Text style={styles.statusText}>{session.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.sessionDetails}>
        <View style={styles.sessionDetailItem}>
          <Ionicons name="time" size={16} color={colors.textSecondary} />
          <Text style={styles.sessionDetailText}>
            {session.startTime} - {session.endTime} ({session.duration})
          </Text>
        </View>
        <View style={styles.sessionDetailItem}>
          <Ionicons name="card" size={16} color={colors.textSecondary} />
          <Text style={styles.sessionDetailText}>{session.price}</Text>
        </View>
        {session.timeRemaining && (
          <View style={styles.sessionDetailItem}>
            <Ionicons name="hourglass" size={16} color={colors.primary} />
            <Text style={[styles.sessionDetailText, { color: colors.primary, fontWeight: '600' }]}>
              {session.timeRemaining} remaining
            </Text>
          </View>
        )}
      </View>

      {session.status === 'active' && (
        <View style={styles.sessionActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleNavigateToSpot(session)}
          >
            <Ionicons name="navigate" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleOpenGate(session)}
          >
            <Ionicons name="key" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Open Gate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleExtendSession(session.id)}
          >
            <Ionicons name="add-circle" size={20} color={colors.warning} />
            <Text style={[styles.actionButtonText, { color: colors.warning }]}>Extend</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEndSession(session.id)}
          >
            <Ionicons name="stop-circle" size={20} color={colors.error} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>End</Text>
          </TouchableOpacity>
        </View>
      )}

      {session.status === 'upcoming' && (
        <View style={styles.sessionActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleNavigateToSpot(session)}
          >
            <Ionicons name="navigate" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Cancel booking')}
          >
            <Ionicons name="close-circle" size={20} color={colors.error} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {session.status === 'completed' && (
        <View style={styles.sessionActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('View receipt')}
          >
            <Ionicons name="receipt" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/map')}
          >
            <Ionicons name="repeat" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Book Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return colors.primary;
      case 'upcoming': return colors.warning;
      case 'completed': return colors.grey;
      default: return colors.grey;
    }
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Sessions</Text>
        <TouchableOpacity onPress={() => router.push('/map')} style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active & Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {activeTab === 'active' ? (
          <View style={styles.content}>
            {activeSessions.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Active Sessions</Text>
                {activeSessions.map(renderSessionCard)}
              </View>
            )}
            
            {upcomingSessions.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
                {upcomingSessions.map(renderSessionCard)}
              </View>
            )}

            {activeSessions.length === 0 && upcomingSessions.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="car-outline" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyTitle}>No Active Sessions</Text>
                <Text style={styles.emptySubtitle}>
                  Find and book a parking spot to get started
                </Text>
                <TouchableOpacity
                  style={styles.findParkingButton}
                  onPress={() => router.push('/map')}
                >
                  <Text style={styles.findParkingButtonText}>Find Parking</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.content}>
            {pastSessions.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Past Sessions</Text>
                {pastSessions.map(renderSessionCard)}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="time-outline" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyTitle}>No Session History</Text>
                <Text style={styles.emptySubtitle}>
                  Your completed parking sessions will appear here
                </Text>
              </View>
            )}
          </View>
        )}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionSpotName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  sessionAddress: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  sessionSpotNumber: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  sessionDetails: {
    marginBottom: 16,
  },
  sessionDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionDetailText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  sessionActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  findParkingButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  findParkingButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});