import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const RecordSaleScreen = () => {
  const [saleDate, setSaleDate] = useState(new Date());
  const [salePrice, setSalePrice] = useState("1693.1");
  const [sharesSold, setSharesSold] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [recordAsSold, setRecordAsSold] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || saleDate;
    setShowDatePicker(false);
    setSaleDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.companyInfoContainer}>
          <Text style={styles.companyName}>HDFC Bank Ltd</Text>
          <Text style={styles.purchaseInfo}>Purchased 7/26/21</Text>
        </View>
        <View style={styles.priceInfoContainer}>
          <Text style={styles.currentPrice}>$1,693.10</Text>
          <Text style={styles.sharesInfo}>1 share</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, , styles.flexItem]}>
          <Text style={styles.label}>Sale Date:</Text>
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
          <Text style={styles.label}>Sale Price:</Text>
          <TextInput
            style={styles.inputBox}
            value={salePrice}
            onChangeText={setSalePrice}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Switch value={recordAsSold} onValueChange={setRecordAsSold} />
        <Text style={styles.label}>Record 1 share as sold</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>No. of shares sold</Text>
        <View style={styles.sharesSoldContainer}>
          <TouchableOpacity
            onPress={() => setSharesSold(Math.max(1, sharesSold - 1))}
          >
            <Text style={styles.button}>-</Text>
          </TouchableOpacity>
          <Text style={styles.sharesSoldText}>{sharesSold}</Text>
          <TouchableOpacity onPress={() => setSharesSold(sharesSold + 1)}>
            <Text style={styles.button}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sharesAvailable}>1 of 1</Text>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  companyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  purchaseInfo: {
    color: "#555",
  },
  currentPrice: {
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
    marginRight: 10, // Adds space between the items
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sharesSoldContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 100,
  },
  sharesSoldText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    fontSize: 22,
    fontWeight: "bold",
  },
  sharesAvailable: {
    marginTop: 5,
    color: "#555",
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

export default RecordSaleScreen;
