import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const InvestmentScreen = () => {
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await response.json();
        setInvestments(data);
        setFilteredInvestments(data); // Set filtered investments to the full list initially
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvestments();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = investments.filter(
        (item) =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.symbol.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredInvestments(filteredData);
    } else {
      setFilteredInvestments(investments); // If search term is empty, show all
    }
  };

  const handleItemPress = () => {
    navigation.navigate("Add Shares of RELIANCE"); // Navigate to the DetailScreen
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={handleItemPress}>
      <View style={styles.leftContainer}>
        <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>${item.current_price.toFixed(2)}</Text>
        {item.price_change_percentage_24h > 0 ? (
          <Text style={[styles.change, styles.positive]}>
            +{item.price_change_percentage_24h.toFixed(2)}%
          </Text>
        ) : (
          <Text style={[styles.change, styles.negative]}>
            {item.price_change_percentage_24h.toFixed(2)}%
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or symbol"
        value={searchTerm}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredInvestments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
