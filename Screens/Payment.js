import React from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import Razorpay from 'react-native-razorpay';
import { RAZORPAY_KEY_ID } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Pay = () => {
  const [scaleValue] = React.useState(new Animated.Value(1));

  const handlePayment = () => {
    const options = {
      key: RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
      amount: 99900, // Amount in paise (₹999)
      currency: 'INR',
      name: 'Learn Finance',
      description: 'Test UPI Payment',
      image: 'https://your-logo-url.com/logo.png', // Optional, URL for your logo
      prefill: {
        email: 'customer@example.com',
        contact: '9876543210',
      },
      method: {
        upi: true, // Enable UPI only
      },
      theme: {
        color: '#F37254', // Customize Razorpay UI color
      },
    };

    Razorpay.open(options)
      .then((data) => {
        // Success response
        Alert.alert(
          'Payment Successful',
          `Payment ID: ${data.razorpay_payment_id}`
        );
      })
      .catch((error) => {
        // Failure response
        Alert.alert(
          'Payment Failed',
          `Error: ${error.code} | ${error.description}`
        );
      });
  };

  // Handle animation for button press
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Complete Your Payment</Text>
      </View>

      <Animated.View
        style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}
      >
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Icon name="credit-card" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.payButtonText}>Pay ₹999 via UPI</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 12,
    elevation: 10, // Adding shadow effect for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F37254',
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  payButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default Pay;
