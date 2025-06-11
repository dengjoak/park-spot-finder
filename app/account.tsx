import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../styles/commonStyles';

interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  color: string;
  isDefault: boolean;
}

export default function AccountScreen() {
  console.log('AccountScreen rendered');
  
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+31 6 1234 5678',
    memberSince: 'January 2024'
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      licensePlate: 'AB-123-CD',
      model: 'Tesla Model 3',
      color: 'White',
      isDefault: true
    },
    {
      id: '2',
      licensePlate: 'EF-456-GH',
      model: 'BMW X5',
      color: 'Black',
      isDefault: false
    }
  ]);

  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    licensePlate: '',
    model: '',
    color: ''
  });

  const menuItems = [
    { id: 'payment', title: 'Payment Methods', icon: 'card', route: '/payment-methods' },
    { id: 'notifications', title: 'Notifications', icon: 'notifications', route: '/notifications' },
    { id: 'help', title: 'Help & Support', icon: 'help-circle', route: '/help' },
    { id: 'settings', title: 'Settings', icon: 'settings', route: '/settings' },
    { id: 'about', title: 'About ParkinPal', icon: 'information-circle', route: '/about' },
  ];

  const handleAddVehicle = () => {
    if (!newVehicle.licensePlate || !newVehicle.model || !newVehicle.color) {
      Alert.alert('Error', 'Please fill in all vehicle details');
      return;
    }

    const vehicle: Vehicle = {
      id: Date.now().toString(),
      licensePlate: newVehicle.licensePlate.toUpperCase(),
      model: newVehicle.model,
      color: newVehicle.color,
      isDefault: vehicles.length === 0
    };

    setVehicles([...vehicles, vehicle]);
    setNewVehicle({ licensePlate: '', model: '', color: '' });
    setShowAddVehicle(false);
    console.log('Vehicle added:', vehicle);
  };

  const handleRemoveVehicle = (vehicleId: string) => {
    Alert.alert(
      'Remove Vehicle',
      'Are you sure you want to remove this vehicle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setVehicles(vehicles.filter(v => v.id !== vehicleId));
            console.log('Vehicle removed:', vehicleId);
          }
        }
      ]
    );
  };

  const handleSetDefaultVehicle = (vehicleId: string) => {
    setVehicles(vehicles.map(v => ({
      ...v,
      isDefault: v.id === vehicleId
    })));
    console.log('Default vehicle set:', vehicleId);
  };

  const handleMenuPress = (item: any) => {
    console.log('Menu item pressed:', item.title);
    if (item.route) {
      Alert.alert('Coming Soon', `${item.title} feature will be available soon.`);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            Alert.alert('Logged Out', 'You have been successfully logged out.');
          }
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
        <Text style={styles.headerTitle}>My Account</Text>
        <TouchableOpacity onPress={() => router.push('/edit-profile')} style={styles.editButton}>
          <Ionicons name="create" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
            <Text style={styles.profilePhone}>{user.phone}</Text>
            <Text style={styles.profileMember}>Member since {user.memberSince}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>€156.80</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>48h</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </View>
        </View>

        {/* Vehicles Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Vehicles</Text>
            <TouchableOpacity onPress={() => setShowAddVehicle(!showAddVehicle)}>
              <Ionicons name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {showAddVehicle && (
            <View style={styles.addVehicleForm}>
              <TextInput
                style={styles.input}
                placeholder="License Plate (e.g., AB-123-CD)"
                placeholderTextColor={colors.textSecondary}
                value={newVehicle.licensePlate}
                onChangeText={(text) => setNewVehicle({...newVehicle, licensePlate: text})}
                autoCapitalize="characters"
              />
              <TextInput
                style={styles.input}
                placeholder="Vehicle Model (e.g., Tesla Model 3)"
                placeholderTextColor={colors.textSecondary}
                value={newVehicle.model}
                onChangeText={(text) => setNewVehicle({...newVehicle, model: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Color"
                placeholderTextColor={colors.textSecondary}
                value={newVehicle.color}
                onChangeText={(text) => setNewVehicle({...newVehicle, color: text})}
              />
              <View style={styles.addVehicleButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setShowAddVehicle(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.addButton]}
                  onPress={handleAddVehicle}
                >
                  <Text style={styles.addButtonText}>Add Vehicle</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {vehicles.map((vehicle) => (
            <View key={vehicle.id} style={styles.vehicleCard}>
              <View style={styles.vehicleInfo}>
                <View style={styles.vehicleHeader}>
                  <Text style={styles.vehiclePlate}>{vehicle.licensePlate}</Text>
                  {vehicle.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.vehicleModel}>{vehicle.model}</Text>
                <Text style={styles.vehicleColor}>{vehicle.color}</Text>
              </View>
              <View style={styles.vehicleActions}>
                {!vehicle.isDefault && (
                  <TouchableOpacity
                    style={styles.vehicleActionButton}
                    onPress={() => handleSetDefaultVehicle(vehicle.id)}
                  >
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.vehicleActionButton}
                  onPress={() => handleRemoveVehicle(vehicle.id)}
                >
                  <Ionicons name="trash" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={24} color={colors.textSecondary} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color={colors.error} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>ParkinPal v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2024 ParkinPal. All rights reserved.</Text>
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
  editButton: {
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    margin: 20,
    padding: 20,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  profileMember: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  addVehicleForm: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  addVehicleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  vehicleCard: {
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
  vehicleInfo: {
    flex: 1,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vehiclePlate: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  vehicleModel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 2,
  },
  vehicleColor: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  vehicleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  vehicleActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  appInfoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
});