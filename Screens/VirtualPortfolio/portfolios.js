import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const Portfolio = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Invested</Text>
          <Text style={styles.value}>7,498.65</Text>
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Current</Text>
          <Text style={styles.value}>7,748.60</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.pnlRow}>
          <Text style={styles.pnlLabel}>P&L</Text>
          <Text style={styles.pnlValuePositive}>+249.95</Text>
          <Text style={styles.pnlPercentPositive}>+3.33%</Text>
        </View>
      </View>

      {/** Stock Item 1 **/}
      <TouchableOpacity
        style={styles.addButtons}
        onPress={() => {
          navigation.navigate("portfoliodetails", { stockName: "ADANIPOWER" });
        }}
      >
        <View style={styles.stockItem}>
          <Text style={styles.stockName}>ADANIPOWER</Text>
          <Text style={styles.stockDetails}>Qty: 1 • Avg: 579.40</Text>
          <View style={styles.stockRow}>
            <Text style={styles.stockInvested}>Invested 579.40</Text>
            <Text style={styles.stockLTP}>
              LTP 513.25 <Text style={styles.positive}>+0.83%</Text>
            </Text>
          </View>
          <Text style={styles.negative}>-66.15 (-11.42%)</Text>
        </View>
      </TouchableOpacity>

      {/** Stock Item 2 **/}
      <TouchableOpacity
        style={styles.addButtons}
        onPress={() => {
          navigation.navigate("portfoliodetails", { stockName: "GOLDBEES" });
        }}
      >
        <View style={styles.stockItem}>
          <Text style={styles.stockName}>GOLDBEES</Text>
          <Text style={styles.stockDetails}>Qty: 100 • Avg: 65.85</Text>
          <View style={styles.stockRow}>
            <Text style={styles.stockInvested}>Invested 6,585.50</Text>
            <Text style={styles.stockLTP}>
              LTP 69.07 <Text style={styles.positive}>+1.42%</Text>
            </Text>
          </View>
          <Text style={styles.positive}>+321.50 (+4.88%)</Text>
        </View>
      </TouchableOpacity>

      {/** Stock Item 3 **/}

      <TouchableOpacity
        style={styles.addButtons}
        onPress={() => {
          navigation.navigate("portfoliodetails", { stockName: "PHARMABEES" });
        }}
      >
        <View style={styles.stockItem}>
          <Text style={styles.stockName}>PHARMABEES</Text>
          <Text style={styles.stockDetails}>Qty: 15 • Avg: 22.25</Text>
          <View style={styles.stockRow}>
            <Text style={styles.stockInvested}>Invested 333.75</Text>
            <Text style={styles.stockLTP}>
              LTP 21.89 <Text style={styles.positive}>+0.18%</Text>
            </Text>
          </View>
          <Text style={styles.negative}>-5.40 (-1.62%)</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#444",
    marginVertical: 10,
  },
  title: {
    color: "#888",
    fontSize: 16,
    fontFamily:"monospace"
  },
  value: {
    color: "#fff",
    fontSize: 16,
    fontFamily:"monospace"
  },
  pnlRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pnlLabel: {
    color: "#888",
    fontSize: 16,
  },
  pnlValuePositive: {
    color: "#4caf50",
    fontSize: 16,
  },
  pnlPercentPositive: {
    color: "#4caf50",
    fontSize: 16,
  },
  stockItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    fontFamily:"monospace"
  },
  stockName: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 4,
    fontFamily:"monospace"
  },
  stockDetails: {
    color: "#888",
    fontSize: 14,
    marginBottom: 8,
    fontFamily:"monospace"
  },
  stockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stockInvested: {
    color: "#888",
    fontFamily:"monospace"
  },
  stockLTP: {
    color: "#fff",
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});

export default Portfolio;
