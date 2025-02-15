import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native"; 
import axios from "axios"; 
import api from '../api';
import { useNavigation } from "@react-navigation/native";

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { username, asset, stockName, ticker, price, priceChange } = route.params;
  
  const [saleDate, setSaleDate] = useState(new Date());
  const [salePrice, setSalePrice] = useState(price);
  const [sharesSold, setSharesSold] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(price);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || saleDate;
    setShowDatePicker(false);
    setSaleDate(currentDate);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${api}/api/holdings/portfolio`, {
        username,
        asset,
        name: stockName,
        bought_price: purchasePrice,
        qty: sharesSold,
        date_purchased: saleDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      });
      Alert.alert("Success", "Data entry successfully!");
      navigation.push('Portfolio',{username});
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.companyInfoContainer}>
          <Text style={styles.stockName}>{stockName}</Text>
          <Text style={styles.stockExchange}>{ticker}</Text>
        </View>
        <View style={styles.priceInfoContainer}>
          <Text style={styles.stockPrice}>₹ {salePrice}</Text>
          <Text style={[styles.stockChange, priceChange > 0 ? styles.positive : styles.negative]}>
            {priceChange > 0 ? "▲" : "▼"} {priceChange.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Quantity:</Text>
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={() => setSharesSold(Math.max(1, sharesSold - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={String(sharesSold)}
            onChangeText={(text) => setSharesSold(Number(text) || 1)}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => setSharesSold(sharesSold + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.flexItem]}>
          <Text style={styles.label}>Purchase Date:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputBox}>
            <Text>{saleDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker value={saleDate} mode="date" onChange={onChangeDate} />
          )}
        </View>

        <View style={[styles.inputContainer, styles.flexItem]}>
          <Text style={styles.label}>Purchase Price:</Text>
          <TextInput
          style={styles.inputBox}
          value={String(purchasePrice)}
          onChangeText={setPurchasePrice} // Update only the purchasePrice, not salePrice
          keyboardType="numeric"
        />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  card: { backgroundColor: "#f5f5f5", padding: 15, borderRadius: 10, marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  stockName: { fontSize: 18, fontWeight: "bold" },
  stockExchange: { color: "#555" },
  stockPrice: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  stockChange: { fontSize: 16, fontWeight: "bold" },
  positive: { color: "green" },
  negative: { color: "red" },
  rowContainer: { flexDirection: "row", justifyContent: "space-between" },
  flexItem: { flex: 1, marginRight: 10 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  inputBox: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 },
  quantityContainer: { marginBottom: 25 },
  quantityBox: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, justifyContent: "space-between", width: 320 },
  quantityButton: { fontSize: 18, fontWeight: "bold" },
  quantityInput: { textAlign: "center", fontSize: 18, width: 40 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  cancelButton: { backgroundColor: "#ccc", padding: 10, borderRadius: 5, flex: 1, alignItems: "center", marginRight: 5 },
  saveButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5, flex: 1, alignItems: "center", marginLeft: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default DetailScreen;