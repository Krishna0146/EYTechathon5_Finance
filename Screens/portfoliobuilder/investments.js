import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import api from "../api";

const InvestmentScreen = () => {
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { username, asset } = route.params || {};

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        let response;
        if (asset === "Stock") {
          response = await axios.get(`${api}/api/stocks/getallstocks`);
        } else if (asset === "MutualFund") {
          response = await axios.get(`${api}/api/stocks/getallmfs`);
        } else {
          return;
        }
        const updatedData = response.data.map((item) => ({
          ...item,
          ticker: asset === "Stock" 
            ? (item.ticker ? item.ticker.replace(".NS", "") : "N/A") 
            : asset === "MutualFund" 
            ? item.mf_identifier || "N/A" 
            : "N/A",
          price: item.price !== "N/A" ? Number(item.price) : 100,  
          price_change_percentage_24h: asset === "Stock" 
            ? Number(item.price_change_percentage_24h ?? 0) 
            : Number(item.change_percentage ?? 0), 
        }));
        setInvestments(updatedData);
        setFilteredInvestments(updatedData);
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    };
    fetchInvestments();
    const interval = setInterval(fetchInvestments, 600000);
    return () => clearInterval(interval);
  }, [asset, username]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = investments.filter(
        (item) =>
          item.stock_name?.toLowerCase().includes(text.toLowerCase()) ||
          item.ticker?.toLowerCase().includes(text.toLowerCase()) ||
          item.mf_name?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredInvestments(filteredData);
    } else {
      setFilteredInvestments(investments);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate("DetailScreen", {
      username: username,
      asset: asset,
      stockName:
        asset === "Stock"
          ? item.stock_name || "Unnamed Stock"
          : item.mf_name || "Unnamed Fund",
      ticker:
        asset === "Stock"
          ? item.ticker || "N/A"
          : asset === "MutualFund"
          ? item.mf_identifier || "N/A"
          : "N/A",
      price: Number(item.price ?? 0),//price_change_percentage_24h
      priceChange: Number(item.price_change_percentage_24h ?? 0),
    });
  };

  const renderItem = ({ item }) => {
    const price = Number(item.price ?? 0); // Ensure price is a number
    const priceChange = Number(item.price_change_percentage_24h ?? 0);
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.leftContainer}>
          <Text style={styles.symbol}>
            {asset === "Stock"
              ? item.ticker
                ? item.ticker.toUpperCase()
                : "N/A"
              : item.mf_name || "Unnamed Fund"}
          </Text>
          <Text style={styles.name}>
            {asset === "Stock"
              ? item.stock_name || "Unnamed Stock"
              : item.mf_identifier || "Unnamed Fund"}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.price}>₹{price.toFixed(2)}</Text>
          <Text
            style={[
              styles.change,
              priceChange > 0 ? styles.positive : styles.negative,
            ]}
          >
            {priceChange > 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or symbol"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredInvestments}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.stock_id?.toString() ?? item.mf_id?.toString()
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  searchBar: {
    height: 40,
    marginHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    fontFamily:"monospace"
  },
  listItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontFamily:"monospace"
  },
  leftContainer: {
    flexDirection: "column",
  },
  symbol: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"monospace",
    letterSpacing: -1,
  },
  name: {
    fontSize: 16,
    color: "#666",
    fontFamily:"monospace"
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"monospace"
  },
  change: {
    fontSize: 14,
    fontFamily:"monospace"
  },
  positive: {
    color: "green",
    fontFamily:"monospace"
  },
  negative: {
    color: "red",
    fontFamily:"monospace"
  },
});
export default InvestmentScreen;