import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import axios from "axios"; 
import api from "../api";
import { useRoute } from '@react-navigation/native';

const InvestmentScreen = () => {
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation(); 
  const route = useRoute();
  const { username,asset } = route.params || {};

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await axios.get(`${api}/api/stocks/getallstocks`);
        const updatedData = response.data.map((item) => ({
          ...item,
          ticker: item.ticker ? item.ticker.replace(".NS", "") : "N/A",
          price: item.price ?? 100, 
          price_change_percentage_24h: item.price_change_percentage_24h ?? 0, 
        }));
        setInvestments(updatedData);
        setFilteredInvestments(updatedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvestments(); // Initial fetch
    // Fetch data every 2 seconds
    const interval = setInterval(fetchInvestments, 6000000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);  
  
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = investments.filter(
        (item) =>
          item.stock_name?.toLowerCase().includes(text.toLowerCase()) ||
          item.ticker?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredInvestments(filteredData);
    } else {
      setFilteredInvestments(investments);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate("DetailScreen", {
      username:username,
      asset:asset,
      stockName: item.stock_name || "Unnamed Stock",
      ticker: item.ticker || "N/A",
      price: Number(item.price ?? 0), // Ensure it's a number
      priceChange: Number(item.price_change_percentage_24h ?? 0),  
    });
  };  

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem} 
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.symbol}>
          {item.ticker ? item.ticker.toUpperCase() : "N/A"}
        </Text>
        <Text style={styles.name}>{item.stock_name || "Unnamed Stock"}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>₹{(item.price ?? 0).toFixed(2)}</Text>
        <Text
          style={[
            styles.change,
            (item.price_change_percentage_24h ?? 0) > 0
              ? styles.positive
              : styles.negative,
          ]}
        >
          {(item.price_change_percentage_24h ?? 0) > 0 ? "+" : ""}
          {(item.price_change_percentage_24h ?? 0).toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );

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
        keyExtractor={(item) => item.stock_id?.toString() ?? Math.random().toString()}
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
  },
  listItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  leftContainer: {
    flexDirection: "column",
  },
  symbol: {
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    color: "#666",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  change: {
    fontSize: 14,
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
});

export default InvestmentScreen;