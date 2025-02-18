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
  const [bondHoldings, setBondHoldings] = useState([]);

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

  useEffect(() => {
    const fetchBonds = async () => {
      try {
        // Fetch bond data using the API URL and the username parameter
        const response = await axios.get(`${api}/api/bonds/bonddata/${username}`);
        // Assuming the response contains an array of bonds under 'bonds' key
        console.log("hai",response.data)
        setBondHoldings(response.data); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching bond data');
        setLoading(false);
      }
    };

    fetchBonds();
  }, [username]);

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
          onPress={() => navigation.navigate('EachHold',{ name: item.name, username: username,asset:"Stock" })}
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
        onPress={() => navigation.navigate('EachHold',{ name: item.name, username: username,asset:"MutualFund" })}
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
          <Text style={styles.holdingName}>{item.bond_name}</Text>
          <Text style={styles.holdingAvg}>Coupon Rate: {item.coupon_rate}%</Text>
          <Text style={styles.holdingQuantity}>Face Value: ₹{item.face_value}</Text>
          <Text style={styles.holdingMaturity}>Maturity Date: {new Date(item.maturity).toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  );
  
  const renderSGBCard = (type) => {
    // Calculate the total invested value by summing up the face_value of all bonds
    const totalInvested = bondHoldings.reduce((total, bond) => total + bond.face_value, 0);
  
    return (
      <View style={styles.summaryCard}>
        <Text style={styles.label}>Total Invested in {type}</Text>
        <Text style={styles.amount}>₹{totalInvested.toFixed(2)}</Text>
      </View>
    );
  };  

  const renderOverviewContent = () => {
    // Get invested and total value for equity and mutual funds
    const { investedValue: equityInvestedValue, totalValue: equityTotalValue } = renderSummaryCards("Equity");
    const { investedValue: mutualFundInvestedValue, totalValue: mutualFundTotalValue } = renderSummaryCards("Mutual Funds");

    // Calculate the total invested value and total value
    const totalInvestedValue = equityInvestedValue + mutualFundInvestedValue;
    const totalValue = equityTotalValue + mutualFundTotalValue;

    // Calculate overall gain
    const overallGain = totalValue - totalInvestedValue;
    const gainPercentage = totalInvestedValue > 0 ? (overallGain / totalInvestedValue) * 100 : 0;

    return (
      <>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Invested Value</Text>
          <Text style={styles.amount}>₹{totalInvestedValue.toFixed(2)}</Text>
          <Text 
            style={[styles.gain, { color: overallGain < 0 ? '#ff6347' : '#228b22' }]}
          >
            {overallGain < 0 ? '↓ Overall Loss' : '↑ Overall Gain'} ₹{overallGain.toFixed(2)} ({gainPercentage.toFixed(2)}%)
          </Text>
          <Text style={styles.label}>Total Value</Text>
          <Text style={styles.amount}>₹{totalValue.toFixed(2)}</Text>
        </View>

        <View style={styles.assetContainer}>
          <Text style={styles.assetTitle}>Assets</Text>

          {/* Equity Section */}
          <View style={styles.assetCard}>
            <Text style={styles.assetLabel}>EQUITY</Text>
            <Text style={styles.assetAmount}>Invested: ₹{equityInvestedValue.toFixed(2)}</Text>
            <Text style={styles.assetAmount}>Total Value: ₹{equityTotalValue.toFixed(2)}</Text>
            <Text style={[styles.gain, { color: (equityTotalValue - equityInvestedValue) < 0 ? '#ff6347' : '#228b22' }]}>
              {equityTotalValue - equityInvestedValue < 0 ? '↓ Loss' : '↑ Gain'} ₹{(equityTotalValue - equityInvestedValue).toFixed(2)}
            </Text>
          </View>

          {/* Mutual Funds Section */}
          <View style={styles.assetCard}>
            <Text style={styles.assetLabel}>MUTUAL FUNDS</Text>
            <Text style={styles.assetAmount}>Invested: ₹{mutualFundInvestedValue.toFixed(2)}</Text>
            <Text style={styles.assetAmount}>Total Value: ₹{mutualFundTotalValue.toFixed(2)}</Text>
            <Text style={[styles.gain, { color: (mutualFundTotalValue - mutualFundInvestedValue) < 0 ? '#ff6347' : '#228b22' }]}>
              {mutualFundTotalValue - mutualFundInvestedValue < 0 ? '↓ Loss' : '↑ Gain'} ₹{(mutualFundTotalValue - mutualFundInvestedValue).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.actionCard} 
            onPress={() => navigation.navigate("Bond", { username, asset: "Bond" })}
          >
            <Text style={styles.assetLabel}>SGB</Text>
            <Text style={styles.actionText}>Start Investing in Gold</Text>
            <Text style={styles.actionButton}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </>
    );
};

// Then use mergeHoldings inside renderSummaryCard
const stockPrices = [
  { company_name: "Reliance Industries Ltd", ticker: "RELIANCE", current_price: 1224.90 },
  { company_name: "Tata Consultancy Services Ltd", ticker: "TCS", current_price: 3904.50 },
  { company_name: "HDFC Bank Ltd", ticker: "HDFCBANK", current_price: 1717.35 },
  { company_name: "Bharti Airtel Ltd", ticker: "BHARTIARTL", current_price: 1675.55 },
  { company_name: "Infosys Ltd", ticker: "INFY", current_price: 1842.30 },
  { company_name: "Larsen & Toubro Ltd", ticker: "LT", current_price: 3221.35 },
  { company_name: "Adani Enterprises Ltd", ticker: "ADANIENT", current_price: 2223.70 },
  { company_name: "Asian Paints Ltd", ticker: "ASIANPAINT", current_price: 2250.85 },
  { company_name: "Hindustan Unilever Ltd", ticker: "HINDUNILVR", current_price: 2329.40 },
  { company_name: "Mahindra & Mahindra Ltd", ticker: "M&M", current_price: 2831.95 },
  { company_name: "Maruti Suzuki India Ltd", ticker: "MARUTI", current_price: 12762.90 }
];

// Function to get current price of a stock
const getStockPrice = (stockName) => {
  const stock = stockPrices.find((s) => s.company_name === stockName);
  return stock ? stock.current_price : 0;
};

// Mock data for Mutual Funds and their NAVs
const mutualFundNavs = [
  {
    mf_identify: "Nippon India Small Cap Fund",
    nav: 145.8709
  },
  {
    mf_identify: "Nippon India Flexi Cap Fund",
    nav: 14.84 // Example NAV
  },
  {
    mf_identify: "Nippon India Power & Infra Fund",
    nav: 294.58
  },
  {
    mf_identify: "ICICI Prudential Equity & Debt Fund",
    nav: 28.90
  },
  {
    mf_identify: "HDFC Balanced Advantage Fund",
    nav: 476.05
  },
  {
    mf_identify: "SBI Equity Hybrid Fund",
    nav: 87.29
  },
  {
    mf_identify: "Bank of India ELSS Tax Saver Dir Gr",
    nav: 163.93
  },
  {
    mf_identify: "Nippon India ELSS Tax Saver Dir Gr",
    nav: 122.78
  }
];

// Function to get NAV for a mutual fund based on mf_identifier
const getMutualFundNav = (mf_identify) => {
  const fund = mutualFundNavs.find(fund => fund.mf_identifier === mf_identify);
  console.log(fund.nav)
  return fund ? fund.nav : 0; // Default to 0 if NAV is not found
};

// renderSummaryCard Function
const renderSummaryCard = (type) => {
  let investedValue = 0;
  let totalValue = 0;

  if (type === "Equity") {
    const stockHoldings = mergeHoldings(
      portfolio?.holdings?.filter((holding) => holding.asset === "Stock") || []
    );

    console.log("Filtered Stock Holdings:", stockHoldings);

    investedValue = stockHoldings.reduce(
      (total, stock) => total + parseFloat(stock.bought_price) * stock.qty, 
      0
    );

    totalValue = stockHoldings.reduce((total, stock) => {
      const currentPrice = getStockPrice(stock.name);
      return total + currentPrice * stock.qty;
    }, 0);
  } else if (type === "Mutual Funds") {
    const mutualFundHoldings = mergeHoldings(
      portfolio?.holdings?.filter((holding) => holding.asset === "MutualFund") || []
    );
    console.log(mutualFundHoldings)
    investedValue = mutualFundHoldings.reduce(
      (total, mf) => total + parseFloat(mf.bought_price) * mf.qty, 
      0
    );

    totalValue = mutualFundHoldings.reduce((total, mf) => {
      const currentNav = getMutualFundNav(mf.mf_identifier); // Fetch NAV using mf_identifier
      return total + currentNav * mf.qty; // Multiply qty by the NAV to calculate total value
    }, 0);
  }
  const overallGain = totalValue - investedValue;
  const gainPercentage = investedValue > 0 ? (overallGain / investedValue) * 100 : 0;

  return (
    <View style={styles.summaryCard}>
      <Text style={styles.label}>Total Invested in {type}</Text>
      <Text style={styles.amount}>₹{investedValue.toFixed(2)}</Text>
      <Text 
      style={[
        styles.gain, 
        { color: overallGain < 0 ? '#ff6347' : '#228b22' } // Change color based on overallGain
      ]}
    >
      {overallGain < 0 ? '↓ Overall Loss' : '↑ Overall Gain'}  ₹{overallGain.toFixed(2)} ({gainPercentage.toFixed(2)}%)
    </Text>
      <Text style={styles.label}>Total Value</Text>
      <Text style={styles.amount}>₹{totalValue.toFixed(2)}</Text>
    </View>
  );
};

const renderSummaryCards = (type) => {
  let investedValue = 0;
  let totalValue = 0;

  if (type === "Equity") {
    const stockHoldings = mergeHoldings(
      portfolio?.holdings?.filter((holding) => holding.asset === "Stock") || []
    );
    investedValue = stockHoldings.reduce(
      (total, stock) => total + parseFloat(stock.bought_price) * stock.qty, 
      0
    );

    totalValue = stockHoldings.reduce((total, stock) => {
      const currentPrice = getStockPrice(stock.name);
      return total + currentPrice * stock.qty;
    }, 0);
  } else if (type === "Mutual Funds") {
    const mutualFundHoldings = mergeHoldings(
      portfolio?.holdings?.filter((holding) => holding.asset === "MutualFund") || []
    );
    investedValue = mutualFundHoldings.reduce(
      (total, mf) => total + parseFloat(mf.bought_price) * mf.qty, 
      0
    );
    totalValue = mutualFundHoldings.reduce((total, mf) => {
      const currentNav = getMutualFundNav(mf.mf_identifier); // Fetch NAV using mf_identifier
      return total + currentNav * mf.qty; // Multiply qty by the NAV to calculate total value
    }, 0);
  }
  const overallGain = totalValue - investedValue;
  const gainPercentage = investedValue > 0 ? (overallGain / investedValue) * 100 : 0;
  return { investedValue, totalValue };
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
                {renderSGBCard("SGB")}
                {bondHoldings.length > 0 ? (
                  <View>
                    <SearchBar
                      placeholder="Search SGB"
                      searchTerm={searchTermSGB}
                      setSearchTerm={setSearchTermSGB}
                      onAddPress={() =>
                        navigation.navigate("Bond", { username, asset: "Bond" })
                      }
                    />
                    <FlatList
                      data={bondHoldings} // Use bondHoldings as the data source
                      keyExtractor={(item) => item._id} // Assuming bond_id is unique
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
                        navigation.navigate("Bond", { username, asset: "Bond" })
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
  title: { fontSize: 22, fontWeight: "bold", color: "white",fontFamily:"Bebas Neue" },
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
    fontFamily:"Bebas Neue",
  },
  selectedTab: {
    backgroundColor: "#2196F3", // Blue or any other color for the selected tab
  },
  selectedTabText: {
    color: "#ffffff", // Text color for selected tab
    fontFamily:"Bebas Neue",
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
    fontFamily:"Bebas Neue",
  },
  summaryCard: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 40,
    elevation: 5,
  },
  label: { color: "gray", fontSize: 14,fontFamily:"Bebas Neue" },
  amount: { fontSize: 22, color: "white", fontWeight: "bold",fontFamily:"Bebas Neue" },
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
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16,fontFamily:"Bebas Neue" },
  assetContainer: { marginBottom: 20 },
  assetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    fontFamily:"Bebas Neue",
  },
  assetCard: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  assetLabel: { color: "white", fontSize: 16, fontWeight: "bold",fontFamily:"Bebas Neue" },
  assetAmount: { color: "white", fontSize: 18, marginTop: 5,fontFamily:"Bebas Neue" },
  actionCard: {
    backgroundColor: "#2A2A2A",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  actionText: { color: "gray", fontSize: 14,fontFamily:"Bebas Neue" },
  actionButton: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  holdingsList: { marginBottom: 450,backgroundColor:"black",fontFamily:"Bebas Neue" },
  holdingCard: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  holdingName: { color: "white", fontSize: 16, fontWeight: "bold",fontFamily:"Bebas Neue" },
  holdingAvg: { color: "white", fontSize: 14,fontFamily:"Bebas Neue" },
  holdingCurrentPrice: { color: "white", fontSize: 14,fontFamily:"Bebas Neue" },
  holdingChange: { color: "white", fontSize: 14,fontFamily:"Bebas Neue" },
  holdingQuantity: { color: "white", fontSize: 14,fontFamily:"Bebas Neue" },
  holdingLtp: { color: "white", fontSize: 14,fontFamily:"Bebas Neue" },
  noHoldingsText: { color: "white", fontSize: 16, textAlign: "center",fontFamily:"Bebas Neue"},
  holdingCardContent: {
    flexDirection: "row",
    justifyContent: "space-between", // Position the "+" button to the right
    alignItems: "center", // Align content vertically in the center
    fontFamily:"Bebas Neue",
  },
  holdingDetails: {
    flex: 1, // Ensure the holding details take up available space
    fontFamily:"Bebas Neue",
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
    fontFamily:"Bebas Neue",
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
    fontFamily:"Bebas Neue",
  },
  sgbDetails: {
    color: "gray",
    fontSize: 14,
    fontFamily:"Bebas Neue"
  },
});
export default BPortfolioScreen;