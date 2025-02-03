import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./searchbar";
import { useMemo } from "react";

const PortfolioScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Equity");
  const [searchTermEquity, setSearchTermEquity] = useState("");
  const [searchTermSGB, setSearchTermSGB] = useState("");
  const [searchTermMF, setSearchTermMF] = useState(""); // Added state for search term
  const [sgb, setSgb] = useState([
    {
      name: "Sovereign Gold Bonds 2024-25 Series V",
      issuePrice: "₹6,500/g",
      currentPrice: "--",
      Maturity: "Apr 2038",
      Quantity: "5",
      Profit: "-500",
    },
    {
      name: "Sovereign Gold Bonds 2024-25 Series IV",
      issuePrice: "₹6,213/g",
      currentPrice: "--",
      Maturity: "Feb 2034",
      Quantity: "2",
      Profit: "+1,000",
    },
    {
      name: "Sovereign Gold Bonds 2024-25 Series III",
      issuePrice: "₹6,149/g",
      currentPrice: "--",
      Maturity: "Dec 2032",
      Quantity: "4",
      Profit: "-2,500",
    },
    {
      name: "Sovereign Gold Bonds 2024-25 Series II",
      issuePrice: "₹5,873/g",
      currentPrice: "--",
      Maturity: "Sep 2031",
      Quantity: "1",
      Profit: "+5,500",
    },
    {
      name: "Sovereign Gold Bonds 2024-25 Series I",
      issuePrice: "₹6,500/g",
      currentPrice: "--",
      Maturity: "Apr 2038",
      Quantity: "3",
      Profit: "+10,000",
    },
  ]);
  const [mf, setMf] = useState([
    {
      name: "HDFC ELSS Tax Saver Fund",
      avg: "₹1,542.70",
      currentPrice: "₹673.00",
      change: "+8.73%",
      Quantity: "1",
      ltp: "₹1,677.30",
      ltpChange: "+0.41%",
    },
    {
      name: "Quant ELSS Tax Saver Fund",
      avg: "₹244.38",
      currentPrice: "₹391.86",
      change: "-26.73%",
      Quantity: "3",
      ltp: "₹179.07",
      ltpChange: "+7.09%",
    },
  ]);
  const [holdings, setHoldings] = useState([
    {
      name: "Portfolio 1",
      avg: "₹1,542.70",
      currentPrice: "₹673.00",
      date: "12-02-2033",
      Quantity: "3",
      ltp: "₹1,677.30",
      ltpChange: "+0.41%",
    },
    {
      name: "Portfolio 2",
      avg: "₹244.38",
      currentPrice: "₹391.86",
      date: "12-02-2033",
      change: "-26.73%",
      Quantity: "2",
      ltp: "₹179.07",
      ltpChange: "+7.09%",
    },
    {
      name: "Portfolio 3",
      avg: "₹1,704.27",
      currentPrice: "₹353.96",
      date: "12-02-2033",
      change: "+10.39%",
      Quantity: "5",
      ltp: "₹1,881.25",
      ltpChange: "+2.81%",
    },
    // {
    //   name: "ITC",
    //   avg: "₹216.55",
    //   currentPrice: "₹3,902.40",
    //   date: "12-02-2033",
    //   change: "+100.14%",
    //   Quantity: "6",
    //   ltp: "₹433.35",
    //   ltpChange: "-0.48%",
    // },
    // {
    //   name: "ITCHOTELS",
    //   avg: "₹0.00",
    //   currentPrice: "₹171.85",
    //   date: "12-02-2033",
    //   change: "+0.00%",
    //   Quantity: "4",
    //   ltp: "₹171.85",
    //   ltpChange: "+0.00%",
    // },
    // {
    //   name: "JINDALSTEL",
    //   avg: "₹0.00",
    //   currentPrice: "₹500.00",
    //   date: "12-02-2033",
    //   change: "+0.00%",
    //   Quantity: "1",
    //   ltp: "₹500.00",
    //   ltpChange: "+0.00%",
    // },
  ]);

  const filteredHoldings = useMemo(() => {
    return holdings.filter((holding) =>
      holding.name.toLowerCase().includes(searchTermEquity.toLowerCase())
    );
  }, [searchTermEquity, holdings]);

  const filteredMutualFund = useMemo(() => {
    return mf.filter((mf) =>
      mf.name.toLowerCase().includes(searchTermMF.toLowerCase())
    );
  }, [searchTermMF, mf]);

  const filteredSGB = useMemo(() => {
    return sgb.filter((bond) =>
      bond.name.toLowerCase().includes(searchTermSGB.toLowerCase())
    );
  }, [searchTermSGB, sgb]);

  const renderHoldingItem = ({ item }) => (
    <View style={styles.holdingCard}>
      <View style={styles.holdingCardContent}>
        <View style={styles.holdingDetails}>
          <Text style={styles.holdingName}>{item.name}</Text>
          {/* <Text style={styles.holdingAvg}>Avg: {item.avg}</Text> */}
          <Text style={styles.holdingCurrentPrice}>
            P&L: {item.currentPrice}
          </Text>
          <Text style={styles.holdingChange}>Modified Date: {item.date}</Text>
          {/* <Text style={styles.holdingQuantity}>Quantity: {item.Quantity}</Text> */}
          {/* <Text style={styles.holdingLtp}>
            LTP: {item.ltp} ({item.ltpChange})
          </Text> */}
        </View>

        <TouchableOpacity
          style={styles.addButtons}
          onPress={() => {
            navigation.navigate("portfolios");
          }}
        >
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

//   const renderMutualFundItem = ({ item }) => (
//     <View style={styles.holdingCard}>
//       <View style={styles.holdingCardContent}>
//         <View style={styles.holdingDetails}>
//           <Text style={styles.holdingName}>{item.name}</Text>
//           <Text style={styles.holdingAvg}>Avg: {item.avg}</Text>
//           <Text style={styles.holdingCurrentPrice}>
//             P&L: {item.currentPrice}
//           </Text>
//           <Text style={styles.holdingChange}>Change: {item.change}</Text>
//           <Text style={styles.holdingQuantity}>Quantity: {item.Quantity}</Text>
//           <Text style={styles.holdingLtp}>
//             LTP: {item.ltp} ({item.ltpChange})
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={styles.addButtons}
//           onPress={() => {
//             navigation.navigate("HDFC Bank Ltd");
//           }}
//         >
//           <Ionicons name="chevron-forward" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
//   const renderSGBItem = ({ item }) => (
//     <View style={styles.holdingCard}>
//       <View style={styles.holdingCardContent}>
//         <View style={styles.holdingDetails}>
//           <Text style={styles.sgbName}>{item.name}</Text>
//           <Text style={styles.sgbDetails}>Issue Price: {item.issuePrice}</Text>
//           <Text style={styles.sgbDetails}>
//             Current Price: {item.currentPrice}
//           </Text>
//           <Text style={styles.sgbDetails}>Maturity: {item.Maturity}</Text>
//           <Text style={styles.sgbDetails}>Quantity: {item.Quantity}</Text>
//           <Text style={styles.sgbDetails}>profit/Loss: {item.Profit}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.addButtons}
//           onPress={() => {
//             navigation.navigate("HDFC Bank Ltd");
//           }}
//         >
//           <Ionicons name="chevron-forward" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

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
        <Text style={styles.label}>Portfolio P&L</Text>
        <Text style={styles.amount}>₹{investedValue}</Text>
        <Text style={styles.label}>Total no.of portfolios: 1</Text>
        {/* <Text style={styles.gain}>
          ↑ Overall Gain ₹{overallGain} (+
          {((overallGain / investedValue) * 100).toFixed(2)}%)
        </Text>
        <Text style={styles.label}>Total Value</Text>
        <Text style={styles.amount}>₹{totalValue}</Text>
        <Text style={styles.todayGain}>↑ Today’s Gain ₹802.56 (+1.53%)</Text> */}
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
              <Text style={styles.title}>Virtual Portfolio</Text>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[]}
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
                {holdings.length > 0 && (
                  <View>
                    <SearchBar
                      placeholder="Search Equity"
                      searchTerm={searchTermEquity}
                      setSearchTerm={setSearchTermEquity}
                      onAddPress={() => navigation.navigate("Investments")}
                    />
                    <FlatList
                      data={filteredHoldings} // Render filtered holdings
                      renderItem={renderHoldingItem}
                      keyExtractor={(item) => item.name}
                      style={styles.holdingsList}
                    />
                  </View>
                )}
                {holdings.length === 0 && (
                  <Text style={styles.noHoldingsText}>
                    No holdings available
                  </Text>
                )}
              </>
            )}

            {/* Show Summary Card and SGB for "SGB" */}
            {selectedTab === "SGB" && (
              <>
                {renderSummaryCard("SGB")}
                {sgb.length > 0 && (
                  <View>
                    <SearchBar
                      placeholder="Search SGB"
                      searchTerm={searchTermSGB}
                      setSearchTerm={setSearchTermSGB}
                      onAddPress={() => navigation.navigate("Investments")}
                    />
                    <FlatList
                      data={filteredSGB}
                      renderItem={renderSGBItem}
                      keyExtractor={(item) => item.name}
                    />
                  </View>
                )}
                {sgb.length === 0 && (
                  <Text style={styles.noHoldingsText}>No SGB available</Text>
                )}
              </>
            )}

            {/* Show only holdings when "Mutual Funds" is selected */}
            {selectedTab === "Mutual Funds" && (
              <>
                {renderSummaryCard("Mutual Funds")}
                {mf.length > 0 && (
                  <View>
                    <SearchBar
                      placeholder="Search Mutual Funds"
                      searchTerm={searchTermMF}
                      setSearchTerm={setSearchTermMF}
                      onAddPress={() => navigation.navigate("Investments")}
                    />
                    <FlatList
                      data={filteredMutualFund} // Render filtered holdings
                      renderItem={renderMutualFundItem}
                      keyExtractor={(item) => item.name}
                      style={styles.holdingsList}
                    />
                  </View>
                )}
                {holdings.length === 0 && (
                  <Text style={styles.noHoldingsText}>
                    No holdings available
                  </Text>
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
  title: { fontSize: 22, fontWeight: "bold", color: "white" },
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
    fontFamily:"monospace"
  },
  selectedTab: {
    backgroundColor: "#2196F3", // Blue or any other color for the selected tab
  },
  selectedTabText: {
    color: "#ffffff", // Text color for selected tab
    fontFamily:"monospace"
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
    fontFamily:"monospace"
  },
  summaryCard: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 40,
    elevation: 5,
  },
  label: { color: "gray", fontSize: 14,    fontFamily:"monospace" },
  amount: { fontSize: 22, color: "white", fontWeight: "bold" },
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
    fontFamily:"monospace"
  },
  assetCard: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  assetLabel: { color: "white", fontSize: 16, fontWeight: "bold",fontFamily:"monospace" },
  assetAmount: { color: "white", fontSize: 18, marginTop: 5 },
  actionCard: {
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  actionText: { color: "gray", fontSize: 14, fontFamily:"monospace"  },
  actionButton: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  holdingsList: { marginBottom: 150 },
  holdingCard: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  holdingName: { color: "white", fontSize: 16, fontWeight: "bold", fontFamily:"monospace"  },
  holdingAvg: { color: "white", fontSize: 14 },
  holdingCurrentPrice: { color: "white", fontSize: 14 },
  holdingChange: { color: "white", fontSize: 14 },
  holdingQuantity: { color: "white", fontSize: 14 },
  holdingLtp: { color: "white", fontSize: 14 },
  noHoldingsText: { color: "white", fontSize: 16, textAlign: "center",fontFamily:"monospace" },
  holdingCardContent: {
    flexDirection: "row",
    justifyContent: "space-between", // Position the "+" button to the right
    alignItems: "center", // Align content vertically in the center
  },

  holdingDetails: {
    flex: 1, // Ensure the holding details take up available space
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
    fontFamily:"monospace"
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
    fontFamily:"monospace"
  },
  sgbDetails: {
    color: "gray",
    fontSize: 14,
    fontFamily:"monospace"
  },
});
export default PortfolioScreen;

