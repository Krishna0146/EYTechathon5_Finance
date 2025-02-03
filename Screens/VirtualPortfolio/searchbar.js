import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({ placeholder, searchTerm, setSearchTerm, onAddPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.searchBarContainer}>
      <Ionicons
        name="search"
        size={20}
        color="gray"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchBar}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: "white",
    fontSize: 16,
    paddingLeft: 10,
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
});

export default SearchBar;
