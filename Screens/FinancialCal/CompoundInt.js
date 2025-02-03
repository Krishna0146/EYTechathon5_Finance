import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundingsPerYear, setCompoundingsPerYear] = useState('');
  const [compoundInterest, setCompoundInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  // Compound Interest calculation function
  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);   // Principal
    const R = parseFloat(rate) / 100;  // Annual Interest Rate as a decimal
    const T = parseFloat(time);        // Time in years
    const n = parseFloat(compoundingsPerYear);  // Compounding frequency per year

    if (isNaN(P) || isNaN(R) || isNaN(T) || isNaN(n) || P <= 0 || R <= 0 || T <= 0 || n <= 0) {
      alert("Please enter valid positive numbers for all fields.");
      return;
    }

    // Formula for Compound Interest
    const A = P * Math.pow(1 + R / n, n * T); // Total amount (A)
    const CI = A - P; // Compound Interest (CI)

    setCompoundInterest(CI.toFixed(2)); // Set Compound Interest result
    setTotalAmount(A.toFixed(2)); // Set Total Amount result
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Compound Interest Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Principal Amount (P)"
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
        placeholder="Time (in years)"
        keyboardType="numeric"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Compounding Frequency per Year (n)"
        keyboardType="numeric"
        value={compoundingsPerYear}
        onChangeText={setCompoundingsPerYear}
      />

      <Button title="Calculate" onPress={calculateCompoundInterest} color="#4CAF50" />

      {compoundInterest !== null && (
        <View style={styles.results}>
          <Text style={styles.resultText}>Compound Interest: ${compoundInterest}</Text>
          <Text style={styles.resultText}>Total Amount: ${totalAmount}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2c3e50',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#34495e',
  },
  results: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#2c3e50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  resultText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 10,
  },
});

export default CompoundInterestCalculator;
