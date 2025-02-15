import React, { useState,useEffect  } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./searchbar";
import { useRoute } from '@react-navigation/native';
import api from "../api";
import axios from "axios";

const BPortfolioScreen = () => {
  const route = useRoute();
  const { username } = route.params || {};
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [searchTermEquity, setSearchTermEquity] = useState("");
  const [searchTermSGB, setSearchTermSGB] = useState("");
  const [searchTermMF, setSearchTermMF] = useState(""); // Added state for search term
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [sgb, setSgb] = useState([
  //   {
  //     name: "Sovereign Gold Bonds 2024-25 Series V",
  //     issuePrice: "₹6,500/g",
  //     currentPrice: "--",
  //     Maturity: "Apr 2038",
  //     Quantity: "5",
  //     Profit: "-500",
  //   },
  // ]);

  useEffect(() => {
    if (!username) return;  // Prevents API call if username is undefined
  
    const fetchPortfolio = async () => {
      try {
        console.log("Fetching data for:", username); // Debugging log
        const response = await axios.get(`${api}/api/holdings/portfolio/${username}`);
        console.log("Portfolio Data:", response.data); // Check if data is received
        setPortfolio(response.data);
      } catch (err) {
        console.error("Error fetching portfolio:", err.response?.data?.message || err.message);
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]); // Dependency array ensures re-fetching only when username changes

  const mergeHoldings = (holdings) => {
    const holdingsMap = {};
  
    holdings.forEach((holding) => {
      if (holdingsMap[holding.name]) {
        // If the asset already exists, update its qty and total bought_price
        holdingsMap[holding.name].qty += holding.qty;
        holdingsMap[holding.name].bought_price += holding.bought_price * holding.qty;
      } else {
        // Initialize new asset entry
        holdingsMap[holding.name] = { ...holding };
        holdingsMap[holding.name].bought_price = holding.bought_price * holding.qty; // Total price
      }
    });
  
    // Convert object back to array and calculate the avg price
    return Object.values(holdingsMap).map((holding) => ({
      ...holding,
      bought_price: (holding.bought_price / holding.qty).toFixed(2), // Average price
    }));
  };
  
  // Filtering and merging Stock holdings
  const stockHoldings = mergeHoldings(
    portfolio?.holdings?.filter((holding) => holding.asset === "Stock") || []
  );
  
  // Filtering and merging MutualFund holdings
  const mutualFundHoldings = mergeHoldings(
    portfolio?.holdings?.filter((holding) => holding.asset === "MutualFund") || []
  );
  
  // Filtering and merging Bond holdings
  const bondHoldings = mergeHoldings(
    portfolio?.holdings?.filter((holding) => holding.asset === "Bond") || []
  );
  
  const renderHoldingItem = ({ item }) => (
    <View style={styles.holdingCard}>
      <View style={styles.holdingCardContent}>
        <View style={styles.holdingDetails}>
          <Text style={styles.holdingName}>{item.name}</Text>
          <Text style={styles.holdingAvg}>Avg: ₹{item.bought_price}</Text>
          <Text style={styles.holdingQuantity}>Quantity: {item.qty}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButtons}
          onPress={() => navigation.navigate('EachHold',{ name: item.name, username: username })}
        >
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMutualFundItem = ({ item }) => (
    <View style={styles.holdingCard}>
    <View style={styles.holdingCardContent}>
      <View style={styles.holdingDetails}>
        <Text style={styles.holdingName}>{item.name}</Text>
        <Text style={styles.holdingAvg}>Avg: {item.bought_price}</Text>
        <Text style={styles.holdingQuantity}>Quantity: {item.qty}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButtons}
        onPress={() => navigation.navigate('EachHold',{ name: item.name, username: username })}
      >
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  </View>
  );

  const renderSGBItem = ({ item }) => (
    <View style={styles.holdingCard}>
    <View style={styles.holdingCardContent}>
      <View style={styles.holdingDetails}>
        <Text style={styles.holdingName}>{item.name}</Text>
        <Text style={styles.holdingAvg}>Avg: {item.bought_price}</Text>
        <Text style={styles.holdingQuantity}>Quantity: {item.qty}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButtons}
        onPress={() => navigation.navigate('EachHold',{ name: item.name, username: username })}
      >
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  </View>
  );

  const renderOverviewContent = () => (
    <>
      <View style={styles.summaryCard}>
        <Text style={styles.label}>Invested Value</Text>
        <Text style={styles.amount}>₹36,880</Text>
        <Text style={styles.gain}>↑ Overall Gain ₹16,663.66 (+45.18%)</Text>
        <Text style={styles.label}>Total Value</Text>
        <Text style={styles.amount}>₹53,543.66</Text>
        <Text style={styles.todayGain}>↑ Today’s Gain ₹802.56 (+1.53%)</Text>
      </View>
      <View style={styles.assetContainer}>
        <Text style={styles.assetTitle}>Assets</Text>
        <View style={styles.assetCard}>
          <Text style={styles.assetLabel}>EQUITY</Text>
          <Text style={styles.assetAmount}>₹36,880</Text>
          <Text style={styles.gain}>+ ₹16,663.66 (+45.18%)</Text>
        </View>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.assetLabel}>MUTUAL FUNDS</Text>
          <Text style={styles.actionText}>Start SIPs with just ₹500</Text>
          <Text style={styles.actionButton}>START A SIP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.assetLabel}>SGB</Text>
          <Text style={styles.actionText}>Start Investing in Gold</Text>
          <Text style={styles.actionButton}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderSummaryCard = (type) => {
    const summaryData = {
      Equity: { investedValue: 36880, overallGain: 16663.66 },
      SGB: { investedValue: 32500, overallGain: 2300 },
      "Mutual Funds": { investedValue: 25000, overallGain: 1000 },
    };

    const { investedValue, overallGain } = summaryData[type] || {};
    const totalValue = investedValue + overallGain;

    return (
      <View style={styles.summaryCard}>
        <Text style={styles.label}>Total Invested in {type}</Text>
        <Text style={styles.amount}>₹{investedValue}</Text>
        <Text style={styles.gain}>
          ↑ Overall Gain ₹{overallGain} (+
          {((overallGain / investedValue) * 100).toFixed(2)}%)
        </Text>
        <Text style={styles.label}>Total Value</Text>
        <Text style={styles.amount}>₹{totalValue}</Text>
        <Text style={styles.todayGain}>↑ Today’s Gain ₹802.56 (+1.53%)</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View style={[styles.container, { flex: 1 }]}>
            <View style={styles.header}>
              <Text style={styles.title}>Holdings</Text>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={["Overview", "Equity", "Mutual Funds", "SGB"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.scrollButton,
                    selectedTab === item && styles.selectedTab,
                  ]}
                  onPress={() => setSelectedTab(item)}
                >
                  <Text
                    style={[
                      styles.scrollButtonText,
                      selectedTab === item && styles.selectedTabText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {/* Show only holdings when "Equity" is selected */}
            {selectedTab === "Equity" && (
              <>
                {renderSummaryCard("Equity")}
                {stockHoldings.length > 0 ? (
                  <View>
                    <SearchBar
                      placeholder="Search Equity"
                      searchTerm={searchTermEquity}
                      setSearchTerm={setSearchTermEquity}
                      onAddPress={() =>
                        navigation.navigate("Investments", { username, asset: "Stock" })
                      }
                    />
                    <FlatList
                      data={stockHoldings} // Ensure filtered stockHoldings is used
                      keyExtractor={(item) => item._id}
                      renderItem={renderHoldingItem}
                      style={styles.holdingsList}
                    />
                  </View>
                ) : (
                  <View>
                    <SearchBar
                      placeholder="Search Equity"
                      searchTerm={searchTermEquity}
                      setSearchTerm={setSearchTermEquity}
                      onAddPress={() =>
                        navigation.navigate("Investments", { username, asset: "Stock" })
                      }
                    />
                  <Text style={styles.noHoldingsText}>No holdings available</Text>
                  </View>
                )}
              </>
            )}

            {/* Show Summary Card and SGB for "SGB" */}
            {selectedTab === "SGB" && (
              <>
                {renderSummaryCard("SGB")}
                {bondHoldings.length > 0 ? (
                  <View>
                    <SearchBar
                      placeholder="Search SGB"
                      searchTerm={searchTermSGB}
                      setSearchTerm={setSearchTermSGB}
                      onAddPress={() =>
                        navigation.navigate("Investments", { username, asset: "Bond" })
                      }
                    />
                    <FlatList
                      data={bondHoldings} // Ensure bondHoldings is used
                      keyExtractor={(item) => item._id}
                      renderItem={renderSGBItem}
                      style={styles.holdingsList}
                    />
                  </View>
                ) : (
                  <View>
                  <SearchBar
                      placeholder="Search SGB"
                      searchTerm={searchTermSGB}
                      setSearchTerm={setSearchTermSGB}
                      onAddPress={() =>
                        navigation.navigate("Investments", { username, asset: "Bond" })
                      }
                    />
                  <Text style={styles.noHoldingsText}>No SGB available</Text></View>
                )}
              </>
            )}

            {/* Show only holdings when "Mutual Funds" is selected */}
            {selectedTab === "Mutual Funds" && (
              <>
                {renderSummaryCard("Mutual Funds")}
                {mutualFundHoldings.length > 0 ? (
                  <View>
                    <SearchBar
                      placeholder="Search Mutual Funds"
                      searchTerm={searchTermMF}
                      setSearchTerm={setSearchTermMF}
                      onAddPress={() =>
                        navigation.navigate("Investments", { username, asset: "MutualFund" })
                      }
                    />
                    <FlatList
                      data={mutualFundHoldings} // Ensuring the correct data is used
                      keyExtractor={(item) => item._id}
                      renderItem={renderMutualFundItem}
                      style={styles.holdingsList}
                    />
                  </View>
                ) : (
                  <View>
                    <SearchBar
                      placeholder="Search Mutual Funds"
                      searchTerm={searchTermMF}
                      setSearchTerm={setSearchTermMF}
                      onAddPress={() =>
                        navigation.navigate("Investments", { username, asset: "MutualFund" })
                      }
                    />
                  <Text style={styles.noHoldingsText}>No holdings available</Text></View>
                )}
              </>
            )}

            {/* Render overview content only when "Overview" is selected */}
            {selectedTab === "Overview" && renderOverviewContent()}
          </View>
        }
        // Empty list because all content is rendered inside ListHeaderComponent
        ListEmptyComponent={<View />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 20,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "white",fontFamily:"monospace" },
  scrollButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 25,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily:"monospace",
  },
  selectedTab: {
    backgroundColor: "#2196F3", // Blue or any other color for the selected tab
  },
  selectedTabText: {
    color: "#ffffff", // Text color for selected tab
    fontFamily:"monospace",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    color: "white",
    fontSize: 16,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily:"monospace",
  },
  summaryCard: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 40,
    elevation: 5,
  },
  label: { color: "gray", fontSize: 14,fontFamily:"monospace" },
  amount: { fontSize: 22, color: "white", fontWeight: "bold",fontFamily:"monospace" },
  gain: { color: "#4CAF50", fontSize: 14, marginTop: 5 },
  todayGain: { color: "#FF9800", fontSize: 14, marginTop: 5 },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16,fontFamily:"monospace" },
  assetContainer: { marginBottom: 20 },
  assetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    fontFamily:"monospace",
  },
  assetCard: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  assetLabel: { color: "white", fontSize: 16, fontWeight: "bold",fontFamily:"monospace" },
  assetAmount: { color: "white", fontSize: 18, marginTop: 5,fontFamily:"monospace" },
  actionCard: {
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  actionText: { color: "gray", fontSize: 14,fontFamily:"monospace" },
  actionButton: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  holdingsList: { marginBottom: 450,backgroundColor:"black",fontFamily:"monospace" },
  holdingCard: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  holdingName: { color: "white", fontSize: 16, fontWeight: "bold",fontFamily:"monospace" },
  holdingAvg: { color: "white", fontSize: 14,fontFamily:"monospace" },
  holdingCurrentPrice: { color: "white", fontSize: 14,fontFamily:"monospace" },
  holdingChange: { color: "white", fontSize: 14,fontFamily:"monospace" },
  holdingQuantity: { color: "white", fontSize: 14,fontFamily:"monospace" },
  holdingLtp: { color: "white", fontSize: 14,fontFamily:"monospace" },
  noHoldingsText: { color: "white", fontSize: 16, textAlign: "center",fontFamily:"monospace"},
  holdingCardContent: {
    flexDirection: "row",
    justifyContent: "space-between", // Position the "+" button to the right
    alignItems: "center", // Align content vertically in the center
    fontFamily:"monospace",
  },
  holdingDetails: {
    flex: 1, // Ensure the holding details take up available space
    fontFamily:"monospace",
  },
  addButton: {
    backgroundColor: "#2196F3", // Color for the "+" button
    padding: 10,
    borderRadius: 10, // Make it circular
    justifyContent: "center",
    alignItems: "center",
  },
  addButtons: {
    marginRight: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"monospace",
  },
  sgbContainer: {
    flexGrow: 1,
    padding: 10,
    justifyContent: "center",
  },
  sgbCard: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  sgbName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"monospace",
  },
  sgbDetails: {
    color: "gray",
    fontSize: 14,
    fontFamily:"monospace"
  },
});
export default BPortfolioScreen;