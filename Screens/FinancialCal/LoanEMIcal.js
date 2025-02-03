import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const LoanEMICalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  // EMI calculation function
  const calculateEMI = () => {
    const P = parseFloat(principal);    // Principal Amount
    const R = parseFloat(rate) / 12 / 100; // Monthly Interest Rate
    const T = parseFloat(time) * 12;    // Loan Term in months

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      alert("Please enter valid positive numbers for all fields.");
      return;
    }

    // EMI formula
    const EMI = (P * R * Math.pow(1 + R, T)) / (Math.pow(1 + R, T) - 1); // EMI formula
    const totalPayment = EMI * T;  // Total payment over loan term

    setEmi(EMI.toFixed(2)); // Set EMI result
    setTotalPayment(totalPayment.toFixed(2)); // Set Total Payment result
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Loan EMI Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Loan Amount (Principal)"
        keyboardType="numeric"
        value={principal}
        onChangeText={setPrincipal}
      />
      <TextInput
        style={styles.input}
        placeholder="Annual Interest Rate (%)"
        keyboardType="numeric"
        value={rate}
        onChangeText={setRate}
      />
      <TextInput
        style={styles.input}
        placeholder="Loan Term (in years)"
        keyboardType="numeric"
        value={time}
        onChangeText={setTime}
      />

      <Button title="Calculate EMI" onPress={calculateEMI} color="#007BFF" />

      {emi !== null && (
        <View style={styles.results}>
          <Text style={styles.resultText}>Monthly EMI: ${emi}</Text>
          <Text style={styles.resultText}>Total Payment over {time} years: ${totalPayment}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  results: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default LoanEMICalculator;