import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DetailScreen = () => {
  const [saleDate, setSaleDate] = useState(new Date());
  const [salePrice, setSalePrice] = useState("1693.1");
  const [sharesSold, setSharesSold] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || saleDate;
    setShowDatePicker(false);
    setSaleDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.companyInfoContainer}>
          <Text style={styles.stockName}>Reliance Industries Ltd</Text>
          <Text style={styles.stockExchange}>RELIANCE: NSE</Text>
        </View>
        <View style={styles.priceInfoContainer}>
          <Text style={styles.stockPrice}>₹ 1,693.10</Text>
          <Text style={styles.stockChange}>▲ 1.43%</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Quantity:</Text>
        <View style={styles.quantityBox}>
          <TouchableOpacity
            onPress={() => setSharesSold(Math.max(1, sharesSold - 1))}
          >
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
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.inputBox}
          >
            <Text>{saleDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={saleDate}
              mode="date"
              onChange={onChangeDate}
            />
          )}
        </View>

        <View style={[styles.inputContainer, styles.flexItem]}>
          <Text style={styles.label}>Purchase Price:</Text>
          <TextInput
            style={styles.inputBox}
            value={salePrice}
            onChangeText={setSalePrice}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  companyInfoContainer: {
    flex: 1,
  },
  priceInfoContainer: {
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  stockName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stockExchange: {
    color: "#555",
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexItem: {
    flex: 1,
    marginRight: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  quantityContainer: {
    marginBottom: 25,
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "space-between",
    width: 320,
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityInput: {
    textAlign: "center",
    fontSize: 18,
    width: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DetailScreen;
