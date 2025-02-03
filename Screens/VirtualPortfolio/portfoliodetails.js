import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker
import { useNavigation, useRoute } from "@react-navigation/native";

const PortfolioDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const stockName = route.params?.stockName || "Stock Details";

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: stockName });
  }, [navigation, stockName]);

  const [purchaseHistory, setPurchaseHistory] = useState([
    { date: "Jul 26, 2021", quantity: 5, value: "₹1,693.10" },
    { date: "Jul 28, 2021", quantity: 5, value: "₹1,693.10" },
    { date: "Oct 22, 2021", quantity: 5, value: "₹1,693.10" },
    { date: "Nov 4, 2021", quantity: 5, value: "₹1,693.10" },
    { date: "Nov 9, 2021", quantity: 5, value: "₹1,693.10" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // State to show/hide DateTimePicker

  const handleThreeDotsPress = (index, event) => {
    setSelectedRecordIndex(index);
    const { pageY, pageX } = event.nativeEvent;
    setModalPosition({ top: pageY, right: pageX });
    setUpdatedDate(purchaseHistory[index].date);
    setUpdatedQuantity(purchaseHistory[index].quantity.toString());
    setUpdatedValue(purchaseHistory[index].value);
    setOptionsModalVisible(true);
  };

  const handleCloseOptionsModal = () => {
    setOptionsModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setModalVisible(false);
  };

  const handleUpdateRecord = () => {
    const updatedPurchaseHistory = [...purchaseHistory];
    updatedPurchaseHistory[selectedRecordIndex] = {
      date: updatedDate,
      quantity: parseInt(updatedQuantity),
      value: updatedValue,
    };
    setPurchaseHistory(updatedPurchaseHistory);
    setModalVisible(false);
    setOptionsModalVisible(false);
  };

  const handleDeleteRecord = () => {
    const updatedPurchaseHistory = purchaseHistory.filter(
      (_, index) => index !== selectedRecordIndex
    );
    setPurchaseHistory(updatedPurchaseHistory);
    setOptionsModalVisible(false);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUpdatedDate(selectedDate.toLocaleDateString()); // Set the selected date
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTextLeft}>PURCHASE DATE</Text>
        <Text style={styles.headerTextMiddle}>QUANTITY</Text>
        <Text style={styles.headerTextRight}>VALUE</Text>
      </View>
      <View style={styles.headerLine} />
      <ScrollView>
        {purchaseHistory.map((record, index) => (
          <View key={index} style={styles.record}>
            <Text style={styles.recordDate}>{record.date}</Text>
            <Text style={styles.recordQuantity}>{record.quantity}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.recordValue}>{record.value}</Text>
              <TouchableOpacity
                style={styles.threeDotsButton}
                onPress={(event) => handleThreeDotsPress(index, event)}
              >
                <Icon name="more-vert" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Options Modal (Edit/Delete) */}
      <Modal
        transparent={true}
        visible={optionsModalVisible}
        onRequestClose={handleCloseOptionsModal}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={handleCloseOptionsModal}
        >
          <View
            style={[styles.modalView, { top: modalPosition.top, right: 20 }]}
          >
            <Pressable
              style={styles.optionButton}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="edit" size={20} color="black" />
              <Text style={styles.optionText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={handleDeleteRecord}>
              <Icon name="delete" size={20} color="black" />
              <Text style={styles.optionText}>Delete</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Edit Modal */}
      <Modal
        transparent={true}
        visible={modalVisible && selectedRecordIndex !== null}
        onRequestClose={handleCloseEditModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseEditModal}>
          <View style={styles.editModalView}>
            <Text style={styles.editModalTitle}>Edit Record</Text>

            {/* Date Picker */}
            <Text style={styles.inputLabel}>Purchase Date</Text>
            <TouchableOpacity
              style={styles.inputField}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: updatedDate ? "black" : "gray" }}>
                {updatedDate || "Select Date"}
              </Text>
            </TouchableOpacity>

            {/* DateTimePicker */}
            {showDatePicker && (
              <DateTimePicker
                value={new Date(updatedDate || Date.now())}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}

            <TextInput
              style={styles.inputField}
              value={updatedQuantity}
              onChangeText={setUpdatedQuantity}
              placeholder="Enter Quantity"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.inputField}
              value={updatedValue}
              onChangeText={setUpdatedValue}
              placeholder="Enter Value"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdateRecord}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCloseEditModal}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily:"monospace"
  },
  inputField: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    fontFamily:"monospace"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerTextLeft: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily:"monospace"
  },
  headerTextMiddle: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily:"monospace"
  },
  headerTextRight: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily:"monospace"
  },
  headerLine: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  record: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  recordDate: {
    fontSize: 16,
  },
  recordQuantity: {
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recordValue: {
    fontSize: 16,
  },
  threeDotsButton: {
    padding: 5,
    marginRight: -11,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: "black",
    marginLeft: 10,
    fontFamily:"monospace"
  },
  editModalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  editModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily:"monospace"
  },
  inputField: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily:"monospace"
  },
  cancelButton: {
    backgroundColor: "#FF4136",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily:"monospace"
  },
});

export default PortfolioDetails;
