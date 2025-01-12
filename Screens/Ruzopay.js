import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or any other icon set

const PaymentPage = () => {
  const iconsRow1 = [
    { name: 'Mobile Number', icon: 'phone' },
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

  return (
    <ScrollView style={styles.container}>
      {/* Header Text */}
      <View style={styles.head}><Text style={styles.header}>Banking</Text></View>

      {/* First Row with Icons and Names */}
      <View style={styles.row}>
        {iconsRow1.map((item, index) => (
          <View key={index} style={styles.iconContainer}>
            <Icon name={item.icon} size={40} color="#003366" />
            <Text style={styles.iconText}>{item.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.horizontalLine}></View>

      {/* Second to Fourth Rows with 12 Icons and Names */}
      {[iconsRow2, iconsRow3, iconsRow4].map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, index) => (
            <View key={index} style={styles.iconContainer}>
              <Icon name={item.icon} size={40} color="#003366" />
              <Text style={styles.iconText}>{item.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  iconContainer: {
    alignItems: 'center',
    width: (Dimensions.get('window').width - 40) / 4, // For 4 items per row
  },
  iconText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  head:{
    padding: 5,
    backgroundColor: '#ffff66', 
    alignItems: 'center',
    marginBottom:15,
  }
});

export default PaymentPage;
