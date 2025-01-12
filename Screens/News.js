import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const newsData = [
  {
    id: 1,
    title: "Tech Giant Announces New AI Initiative",
    description: "A leading technology company has announced a new initiative to integrate AI into its products. This marks a significant milestone in the tech world.",
    image: "https://example.com/news1.jpg",  // Placeholder image URL
    date: "2025-01-06",
  },
  {
    id: 2,
    title: "Global Stock Markets See Record Growth",
    description: "Global stock markets have hit all-time highs, with investors optimistic about the global economic recovery after the pandemic.",
    image: "https://example.com/news2.jpg",  // Placeholder image URL
    date: "2025-01-05",
  },
  {
    id: 3,
    title: "New Health Research Shows Promising Results",
    description: "New health research suggests that a new treatment could significantly reduce the risk of certain diseases.",
    image: "https://example.com/news3.jpg",  // Placeholder image URL
    date: "2025-01-04",
  },
];

const scamData = [
  {
    id: 1,
    title: "Fake Investment Scheme Targets Retirees",
    description: "A new scam is circulating where scammers are pretending to offer exclusive investment opportunities, targeting retirees with promises of high returns.",
    image: "https://example.com/scam1.jpg",  // Placeholder image URL
    date: "2025-01-06",
  },
  {
    id: 2,
    title: "Phishing Scam Impersonates Bank Officials",
    description: "A phishing scam is circulating where scammers impersonate bank officials and ask for personal account details. Customers are advised to verify any unsolicited communications.",
    image: "https://example.com/scam2.jpg",  // Placeholder image URL
    date: "2025-01-05",
  },
  {
    id: 3,
    title: "Scammers Using Fake Job Offers to Steal Information",
    description: "A new scam involves fraudulent job offers where scammers ask for personal information and payment upfront for supposed work opportunities.",
    image: "https://example.com/scam3.jpg",  // Placeholder image URL
    date: "2025-01-04",
  },
];

const News = () => {
  const [activeTab, setActiveTab] = useState('news'); // Default to show news

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>Date: {item.date}</Text>
    </View>
  );

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      {/* Top Section with News */}
      <View style={styles.topSection}>
        <Text style={styles.topText}>News</Text>
      </View>

      {/* Scam Alerts and News buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleTabPress('scam')}>
          <Text style={[styles.tabButton, activeTab === 'scam' && styles.activeTab]}>
            Scam Alerts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('news')}>
          <Text style={[styles.tabButton, activeTab === 'news' && styles.activeTab]}>
            News
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display the respective data (News or Scam Alerts) */}
      <FlatList
        data={activeTab === 'news' ? newsData : scamData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => console.log('Load more...')} // Example for fetching more content
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    backgroundColor: '#ffff66',
    padding: 10,
    top: 25,
  },
  topText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    top: 10,
  },
  tabButton: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 5,
  },
  activeTab: {
    color: 'blue',
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
});

export default News;
