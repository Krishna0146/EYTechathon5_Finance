import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import api from "../api";
import DateTimePickerModal from "react-native-modal-datetime-picker"; 

const EachHold = ({ route }) => {
  const { name, username } = route.params;
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null); // Tracks the open menu
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${api}/api/holdings/portfolio/${username}/${name}`);
      const portfolio = response.data;
      const formattedData = portfolio.holdings.map((holding) => ({
        id: holding._id,
        date: new Date(holding.date_purchased).toDateString(),
        quantity: holding.qty.toString(),
        value: holding.bought_price.toString(),
      }));

      setPurchaseHistory(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setLoading(false);
    }
  };

  const handleEditPress = (record) => {
    setSelectedRecord({ ...record });
    setEditModalVisible(true);
    setSelectedMenuId(null); // Close menu after selecting an option
  };

  const handleDelete = async (id) => {
    try {
      //console.log(`Deleting: ${api}/api/holdings/delete/${username}/${id}`);
      await axios.delete(`${api}/api/holdings/delete/${username}/${id}`);
      fetchPortfolioData();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
    setSelectedMenuId(null);
  };

  const handleUpdate = async () => {
    if (!selectedRecord) return;
    try {
      const updatedData = {
        qty: Number(selectedRecord.quantity),
        bought_price: Number(selectedRecord.value),
        date_purchased: selectedRecord.date,
      };

      await axios.put(`${api}/api/holdings/update/${username}/${selectedRecord.id}`, updatedData);
      fetchPortfolioData();
      setEditModalVisible(false);
      setSelectedRecord(null);
    } catch (error) {
      console.error("Error updating record:", error);
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

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <ScrollView>
          {purchaseHistory.map((record) => (
            <View key={record.id} style={styles.record}>
            <Text style={styles.recordDate}>{record.date}</Text>
            <Text style={styles.recordQuantity}>{record.quantity}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.recordValue}>₹{record.value}</Text>
              
              {/* Three Dots Button */}
              <TouchableOpacity
                style={styles.threeDotsButton}
                onPress={() =>
                  setSelectedMenuId(selectedMenuId === record.id ? null : record.id)
                }
              >
                <Icon name="more-vert" size={24} color="#000" />
              </TouchableOpacity>
          
              {/* Dropdown Menu */}
              {selectedMenuId === record.id && (
              <View style={styles.menuWrapper}>
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.menuItem} onPress={() => handleEditPress(record)}>
                    <Text style={styles.menuText}>✏️ Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => handleDelete(record.id)}>
                    <Text style={styles.menuText}>🗑️ Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            </View>
          </View>
          ))}
        </ScrollView>
      )}

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <Text style={styles.modalTitle}>Edit Record</Text>

            <TouchableOpacity style={styles.input} onPress={() => setDatePickerVisibility(true)}>
              <Text>{selectedRecord?.date || "Select Date"}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setSelectedRecord((prev) => ({ ...prev, date: date.toDateString() }));
                setDatePickerVisibility(false);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />

            <TextInput
              style={styles.input}
              value={selectedRecord?.quantity}
              onChangeText={(text) =>
                setSelectedRecord((prev) => ({ ...prev, quantity: text }))
              }
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              value={selectedRecord?.value}
              onChangeText={(text) =>
                setSelectedRecord((prev) => ({ ...prev, value: text }))
              }
              keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
// **Updated Styles**
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  header: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  headerTextLeft: { fontSize: 14, fontWeight: "bold",fontFamily:"monospace" },
  headerTextMiddle: { fontSize: 14, fontWeight: "bold",fontFamily:"monospace" },
  headerTextRight: { fontSize: 14, fontWeight: "bold",fontFamily:"monospace" },
  headerLine: { height: 1, backgroundColor: "#ccc", marginBottom: 10 },
  record: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
    position: "relative", // Ensure menu positions correctly
  },
  valueContainer: { flexDirection: "row", alignItems: "center" },
  threeDotsButton: { padding: 5 },
  recordDate: { fontSize: 16,fontFamily:"monospace" },
  recordQuantity: { fontSize: 16,fontFamily:"monospace" },
  recordValue: { fontSize: 16, marginRight: 10,fontFamily:"monospace" },  
  menuWrapper: {
    position: "absolute",
    top: -18,
    right: 0,
    zIndex: 1000,
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    fontFamily:"monospace"
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    fontFamily:"monospace"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  editModal: { width: 300, backgroundColor: "white", padding: 20, borderRadius: 10,fontFamily:"monospace" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10,fontFamily:"monospace" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "100%",
    fontFamily:"monospace",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  saveButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5 },
  cancelButton: { backgroundColor: "#FF4136", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold",fontFamily:"monospace" },
});
export default EachHold;