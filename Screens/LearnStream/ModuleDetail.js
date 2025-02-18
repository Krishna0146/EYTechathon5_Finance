import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ModuleDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { moduleId, moduleName, moduleDescription } = route.params;

  const handleStart = () => {
    navigation.navigate("Learn", { moduleName });
  };

  const modulesData = [
    {
      "ModuleName": "Stock Market Basics",
      "Module Steps": [
        "Why should you Invest?",
        "Market Intermediaries",
        "All about the Initial Public Offer (IPO)",
        "Why do stock prices fluctuate?",
        "How does a trading platform work?",
        "Stock Market Index",
        "Clearing and Settlement Process",
        "Corporate actions (Dividends, bonuses, and buybacks)",
        "Order Types",
        "Getting started",
      ],
    },
    {
      "ModuleName": "Technical Analysis",
      "Module Steps": [
        "Technical Analysis vs Fundamental Analysis",
        "Setting expectations",
        "Chart Types",
        "Timeframes",
        "Key assumption of technical analysis",
        "Understanding candlestick patterns",
        "Single candlestick patterns",
        "Multiple candlestick patterns",
        "Support and Resistance",
        "Technical indicators",
        "Moving averages",
        "Your trading checklist",
      ],
    },
    {
      "ModuleName": "Fundamental Analysis",
      "Module Steps": [
        "Introduction to fundamental analysis",
        "Mindset of an investor",
        "How to read the annual report of a company",
        "Understanding the P&L statement",
        "Understanding the Balance sheet statement",
        "Understanding the Cash Flow Statement",
        "The connection between balance sheet, P&L statement and cash flow statement",
        "The Financial Ratio Analysis",
        "Quick note on Relative Valuation",
        "Fundamental Investment Checklist",
      ],
    },
    {
      "ModuleName": "Personal Finance",
      "Module Steps": [
        "Introduction to forwards market",
        "Introducing the futures contract",
        "Margins",
        "Leverage and Payoff",
        "Futures trade",
        "Settlement",
        "Open Interest",
        "Shorting futures",
        "Overview of Contracts",
      ],
    },
    {
      "ModuleName": "Introduction to Options Trading",
      "Module Steps": [
        "Introduction to Options",
        "Option Jargons",
        "Long Call Payoff and Short Call Trade",
        "Put Buy and Put Sell",
        "Summarizing Call & Put Options",
        "Moneyness of option",
        "The Option Greeks \u00e2\u20ac\u201c Delta",
        "Gamma",
        "Theta",
        "Vega",
        "Options M2M and P&L calculation",
        "Physical settlement of futures and options",
        "Bull Call Spread",
        "The Straddle",
      ],
    },
    {
      "ModuleName": "Assorted Concepts",
      "Module Steps": [
        "Impact cost and how it can ruin a trade",
        "5 types of share capital",
        "How OFS allotment is done",
        "Building a mutual fund portfolio",
      ],
    },
  ];

  const selectedModule = modulesData.find(
    (module) => module["ModuleName"] === moduleName
  );
  const topics = selectedModule
    ? selectedModule["Module Steps"]
    : ["No topics available"];

  const colors = [
    "#ADD8E6", // First color for the first module
    "#90EE90", // Second color for the second module
    "#FFFACD", // Third color for the third module
    "#FFDAB9", // Fourth color for the fourth module
    "#FFB6C1", // Fifth color for the fifth module
    "#E6E6FA", // Sixth color for the sixth module
    "#D3D3D3", // Seventh color for the seventh module
  ];

  // Dynamically assign colors based on moduleId
  const moduleColor = colors[moduleId - 1] || "#fff"; // Default to white if out of bounds

  return (
    <View style={[styles.container, { backgroundColor: moduleColor }]}>
      {/* Top 40% Section with Full Background */}
      <View style={[styles.topSection, { backgroundColor: moduleColor }]}>
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
          renderItem={({ item }) => (
            <Text style={styles.topicItem}>• {item}</Text>
          )}
        />

        {/* Start Button */}
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: moduleColor }]}
          onPress={handleStart}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  topSection: {
    height: "20%", // Occupying 35% of the screen
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  moduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ea",
    textAlign: "center",
    fontFamily: "Bebas Neue",
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 10,
    paddingHorizontal: 20,
    fontFamily: "Bebas Neue",
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
    fontFamily: "Bebas Neue",
  },

  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  startButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Bebas Neue",
  },
});