import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or any other icon set

const PaymentPage = ({ navigation }) => {
  // Icon Rows
  const iconsRow1 = [
    { name: 'Mobile Number', icon: 'phone', navigateTo: 'MobileNumberPage' },
    { name: 'To Bank/UPI ID', icon: 'account-balance' },
    { name: 'QR', icon: 'qr-code' },
    { name: 'Bank Balance', icon: 'account-balance-wallet' },
  ];

  const iconsRow2 = [
    { name: 'Mobile Recharge', icon: 'sim-card' },
    { name: 'Loan Repayment', icon: 'card-membership' },
    { name: 'Credit Card', icon: 'credit-card' },
    { name: 'Rent', icon: 'home' },
  ];

  const iconsRow3 = [
    { name: 'Subscriptions', icon: 'subscriptions' },
    { name: 'Donations', icon: 'favorite' },
    { name: 'Electricity Bill', icon: 'lightbulb' },
    { name: 'Water', icon: 'water' },
  ];

  const iconsRow4 = [
    { name: 'Insurance', icon: 'security' },
    { name: 'Travel', icon: 'flight' },
    { name: 'Wealth', icon: 'attach-money' },
    { name: 'Fastag', icon: 'traffic' },
  ];

  // Handle navigation
  const handleNavigation = (navigateTo) => {
    if (navigateTo) {
      navigation.navigate('Money');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Banking Services</Text>
      </View>

      {/* Icon Rows */}
      {[iconsRow1, iconsRow2, iconsRow3, iconsRow4].map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={() => handleNavigation(item.navigateTo)}>
              <View style={styles.iconCircle}>
                <Icon name={item.icon} size={30} color="#fff" />
              </View>
              <Text style={styles.iconText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerContainer: {
    backgroundColor: '#ffcc66',
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 4, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom:20
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  iconContainer: {
    alignItems: 'center',
    width: (Dimensions.get('window').width - 40) / 4, // For 4 items per row
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#666633',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconText: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default PaymentPage;
