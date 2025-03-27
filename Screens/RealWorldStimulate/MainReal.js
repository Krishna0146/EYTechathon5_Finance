import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ScenarioList = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [firstSearch, setFirstSearch] = useState(true);

  const scenarios = [
    { id: 1, name: 'Safe and Smart Money Transfers' },
    { id: 2, name: 'Picking the Right Asset Class' },
    { id: 3, name: "Bank Transactions and Procedures"},
    { id: 4, name: 'Smart Investing Decisions'},
    { id: 5, name: 'Retirement Planning'},
    { id: 6, name: 'ATM Transactions and Security'},
  ];
  
  const handleSearch = () => {
    if (searchText.trim() === '') return;
    const query = `Create a scenario regarding {${searchText}} within 30 words which helps me understand about {${searchText}}. Give some possible options and also allow me to choose those you give or outside options, then correct me based on my option. Then I am going to press OK, after that give the next question related to the same scenario until I enter 'stop'. Give only scenario, question, and option.`;
    navigation.navigate('searchbot', { query, searchText,type: 'scenario' });
    setFirstSearch(false);
  };

  const handleScenarioPress = (id, name) => {
    navigation.navigate('conversation', { name });
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ position: "absolute", top: 25, left: 10 }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
      <Text style={styles.heading}>Real World Scenario</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a topic..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={scenarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleScenarioPress(item.id, item.name)}
          >
            <Text style={styles.buttonText}>{`${item.name}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    left: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ScenarioList;