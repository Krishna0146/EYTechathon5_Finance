import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ScenarioList = () => {
  const navigation = useNavigation();

  const scenarios = [
    { id: 1, name: 'Banking Sector' },
    { id: 2, name: 'Auto Sector' },
    { id: 3, name: 'Pharma Sector' },
    { id: 4, name: 'Renewable Energy Sector' },
    { id: 5, name: 'FMCG Sector' },
  ];

  const handlePress = (id, name) => {
    navigation.navigate('ScenarioDetail', { id, name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Scenario</Text>
      <FlatList
        data={scenarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item.id, item.name)}>
            <Text style={styles.itemText}>{`${item.id}. ${item.name}`}</Text>
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
  },
  item: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ScenarioList;
