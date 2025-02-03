import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ModuleDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { moduleId, moduleName, moduleDescription } = route.params;

  const handleStart = () => {
    navigation.navigate("Learn", { moduleId, moduleName });
  };

  const topics = [
    "Introduction to the Stock Market",
    "What is a Stock? (Shares, Equity, Ownership)",
    "How the Stock Market Works",
    "Types of Stocks (Common vs. Preferred)",
    "Stock Exchanges (NYSE, Nasdaq, BSE, NSE, etc.)",
    "Bull vs. Bear Market",
    "Fundamental vs. Technical Analysis",
    "Risk vs. Reward in Stock Investing",
    "How to Open a Demat and Trading Account",
    "Long-term vs. Short-term Investing Strategies",
  ];

  return (
    <View style={styles.container}>
      {/* Top 40% Section with Full Background */}
      <View style={styles.topSection}>
        <Text style={styles.moduleTitle}>
         {moduleId < 10 ? `0${moduleId}` : moduleId} | {moduleName}
        </Text>
        <Text style={styles.description}>{moduleDescription}</Text>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Topics Section */}
        <Text style={styles.topicsHeading}>Topics</Text>
        <FlatList
          data={topics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.topicItem}>• {item}</Text>}
        />
        
        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  topSection: {
    height: "35%", // Occupying 35% of the screen
    backgroundColor: "#d4edda", // Light green background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  moduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ea",
    textAlign: "center",
    fontFamily:"monospace"
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 10,
    paddingHorizontal: 20,
    fontFamily:"monospace"
  },

  contentSection: {
    flex: 1, // Takes up remaining space (65%)
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  topicsHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },

  topicItem: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
    fontFamily:"monospace"
  },

  startButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },

  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"monospace"
  },
});
