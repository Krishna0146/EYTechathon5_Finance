import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";// Import icons

const HDFCBANKEquity = () => {
  const navigation = useNavigation();
  const [purchaseHistory, setPurchaseHistory] = useState([
    { date: "Jul 26, 2021", quantity: 5, value: "₹1,693.10" },
    { date: "Jul 28, 2021", quantity: 5, value: "₹1,693.10" },
    { date: "Oct 22, 2021", quantity: 5, value: "₹1,693.10" },
    { date: "Nov 4, 2021", quantity: 5, value: "₹1,693.10" },
    { date: "Nov 9, 2021", quantity: 5, value: "₹1,693.10" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

  const handleThreeDotsPress = (index, event) => {
    setSelectedRecordIndex(index);
    const { pageY, pageX } = event.nativeEvent; // Get touch position
    setModalPosition({ top: pageY, right: pageX });
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleRecordSale = () => {
    console.log("Record Sale for:", selectedRecordIndex);
    navigation.navigate("Record a Sale");
    setModalVisible(false);
  };

  const handleDeleteRecord = () => {
    console.log("Delete Record for:", selectedRecordIndex);
    setModalVisible(false);
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
      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordButtonText}>Record Another Purchase</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete HDFCBANK</Text>
      </TouchableOpacity>

      {/* Modal for Options */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <View
            style={[styles.modalView, { top: modalPosition.top, right: 20 }]}
          >
            <Pressable style={styles.optionButton} onPress={handleRecordSale}>
              <Icon name="sell" size={20} color="black" />
              <Text style={styles.optionText}>Record a Sale</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={handleDeleteRecord}>
              <Icon name="delete" size={20} color="black" />
              <Text style={styles.optionText}>Delete</Text>
            </Pressable>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerTextLeft: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft:-5,
    marginRight:-50,
  },
  headerTextMiddle: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft:30,
  },
  headerTextRight: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight:25,
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
  recordQuantity:{
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recordValue: {
    fontSize: 16,
    marginRight: -6,
    marginLeft:-20,
  },
  threeDotsButton: {
    padding: 5,
    marginRight:-11,
  },
  recordButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  recordButtonText: {
    color: "white",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FF4136",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Light transparent overlay
    justifyContent: "flex-start",
    alignItems: "flex-end", // Align dropdown to the right
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
  },
});

export default HDFCBANKEquity;
