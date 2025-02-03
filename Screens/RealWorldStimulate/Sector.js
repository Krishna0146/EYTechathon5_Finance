import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const sectors = [
  "IT",
  "Banking",
  "Auto",
  "Pharma",
  "FMCG",
  "Renewable",
  "Real Estate",
  "Metals",
  "Telecom",
  "Oil & Gas",
];
const scenarios = [
  { label: "1. Increased Infrastructure Spending 🏗️", value: "1" },
  { label: "2. Higher Allocation for Healthcare 🏥", value: "2" },
  { label: "3. Tax Cuts for Middle-Class and Corporates 💼", value: "3" },
  { label: "4. Increased Focus on Renewable Energy ⚡", value: "4" },
  { label: "5. Increased Agricultural Subsidies 🌾", value: "5" },
  { label: "6. Increased Defense Spending 🛡️", value: "6" },
];
const scenarioData = {
  1: ["➖", "🔼", "🔼", "➖", "🔼", "🔼", "🔼", "🔼", "➖", "➖"], // Infrastructure
  2: ["➖", "➖", "➖", "🔼", "➖", "➖", "➖", "➖", "➖", "➖"], // Healthcare
  3: ["🔼", "🔼", "🔼", "🔼", "🔼", "➖", "🔼", "➖", "🔼", "➖"], // Tax Cuts
  4: ["➖", "➖", "🔼", "➖", "➖", "🔼", "➖", "🔼", "➖", "🔽"], // Renewable Energy
  5: ["➖", "🔼", "🔼", "➖", "🔼", "➖", "➖", "➖", "🔼", "➖"], // Agricultural Subsidies
  6: ["🔼", "➖", "➖", "➖", "➖", "➖", "➖", "🔼", "➖", "➖"], // Defense Spending
};

const Sectors = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [simulatedData, setSimulatedData] = useState([]);

  const handleSimulate = () => {
    if (selectedScenario) {
      setSimulatedData(scenarioData[selectedScenario]);
    }
  };

  const renderSectorCard = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.sectorName}>{item}</Text>
      {simulatedData[index] && (
        <Text
          style={[
            styles.symbol,
            simulatedData[index] === "🔼" && styles.green,
            simulatedData[index] === "🔽" && styles.red,
          ]}
        >
          {simulatedData[index]}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sectors}
        renderItem={renderSectorCard}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedScenario}
          onValueChange={(itemValue) => setSelectedScenario(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a Scenario" value={null} />
          {scenarios.map((scenario) => (
            <Picker.Item
              key={scenario.value}
              label={scenario.label}
              value={scenario.value}
            />
          ))}
        </Picker>
        <TouchableOpacity
          style={[
            styles.button,
            !selectedScenario && styles.disabledButton,
          ]}
          onPress={handleSimulate}
          disabled={!selectedScenario}
        >
          <Text style={styles.buttonText}>Simulate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  grid: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  sectorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  symbol: {
    fontSize: 24,
    marginTop: 8,
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  dropdownContainer: {
    marginTop: 16,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Sectors;