import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CommunityPage = () => {
  const [searchText, setSearchText] = useState('');

  // Dummy chat data
  const chats = [
    { id: '1', name: 'Financial Community for Rural Women', profile: 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid' },
    { id: '2', name: 'Youth Financial Literacy Group', profile: 'https://img.freepik.com/free-vector/finance-elements-illustratio_1168-343.jpg?semt=ais_hybrid' },
    { id: '3', name: 'Women Entrepreneurs Network', profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVmx1dF1lYadBPmaOlzCMdoNM3GauGJvIAzg&s' },
    { id: '4', name: 'Small Business Support Group', profile: 'https://parsadi.com/wp-content/uploads/2022/05/Business.jpg' },
    { id: '5', name: 'Retirement Planning Circle', profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhp8sfOU9xMl1L7aR3SF2NsTK2vRkEq6_HEw&s' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Community</Text>
      </View>

      {/* Search Box */}
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search communities"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        renderItem={({ item }) => (
          <View style={styles.chatBox}>
            <Image source={{ uri: item.profile }} style={styles.profileImage} />
            <Text style={styles.chatName}>{item.name}</Text>
          </View>
        )}
      />

      {/* Create Group Icon */}
      <TouchableOpacity style={styles.penIconContainer}>
        <Text style={styles.penIcon}>✏️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBoxContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBox: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  chatList: {
    flex: 1,
    marginTop: 10,
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  penIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  penIcon: {
    fontSize: 24,
    color: '#fff',
  },
});

export default CommunityPage;