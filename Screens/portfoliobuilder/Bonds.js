import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,ScrollView } from 'react-native';
import api from '../api'; // Assuming your api.js is set up correctly
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const BondList = () => {
    const route=useRoute();
    const {username,asset}=route.params;
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBonds = async () => {
      try {
        const response = await axios.get(`${api}/api/bonds`);
        console.log(response.data)
        setBonds(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the bond data!", error);
        setLoading(false);
      }
    };

    fetchBonds();
  }, []);

  const handleAddBond = async (bondId, bondName, bondType, couponRate, maturity, faceValue) => {
    try {
      const response = await axios.post(`${api}/api/bonds/bonddata`, {
        username: username, // from route params
        bondId,
        bondName,
        bondType,
        couponRate,
        maturity,
        faceValue,
      });
      console.log(response.data.message);
      navigation.push('Portfolio',{username});
      // Optionally, update UI to reflect the added bond
    } catch (error) {
      console.error("There was an error adding the bond!", error);
    }
  };  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bond List</Text>
      <View style={styles.bondList}>
      {bonds.map(bond => (
        <View key={bond.bond_id} style={styles.bondCard}>
            <Text style={styles.bondName}>{bond.bond_name}</Text>
            <Text><Text style={styles.boldText}>Bond ID:</Text> {bond.bond_id}</Text>
            <Text><Text style={styles.boldText}>Bond Type:</Text> {bond.bond_type}</Text>
            <Text><Text style={styles.boldText}>Coupon Rate (%):</Text> {bond.coupon_rate}</Text>
            <Text><Text style={styles.boldText}>Maturity Date:</Text> {new Date(bond.maturity).toLocaleDateString()}</Text>
            <Text><Text style={styles.boldText}>Face Value:</Text> ₹{bond.face_value}</Text>
            <TouchableOpacity
            onPress={() => handleAddBond(
                bond.bond_id, 
                bond.bond_name, 
                bond.bond_type, 
                bond.coupon_rate, 
                bond.maturity, 
                bond.face_value
            )}
            style={styles.addButton}
            >
            <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bondList: {
    flexDirection: 'column',
    gap: 20,
  },
  bondCard: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bondName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BondList;