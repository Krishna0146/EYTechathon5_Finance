import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const topicsList = [
  'Budget', 'Credit Card', 'Loans', 'Savings Account', 'Emergency Fund', 'Retirement Plans',
  'Debt Management', 'Investment Strategy', 'Financial Goals', 'Student Loans',
  'Tax Refund', 'Financial Freedom', 'Stocks', 'Bonds', 'ETFs', 'Mutual Funds',
  'Real Estate', 'Portfolio Management', 'Risk vs. Return', 'Asset Allocation',
  'Dividend Investing', 'Growth Stocks', 'Index Funds', 'Stock Market', 'Bull Market',
  'IPO', 'Securities', 'Life Insurance', 'Health Insurance', 'Insurance Policy',
  'Fraud Prevention', 'Term Life Insurance',
];

const Stage3 = () => {
  const route = useRoute();
  const { selectedTopics } = route.params || {}; // Default to empty array if no topics passed

  const navigation = useNavigation();

  const [showMore, setShowMore] = useState(false);
  const [updatedSelectedTopics, setUpdatedSelectedTopics] = useState(selectedTopics || []);

  const unselectedTopics = topicsList.filter(topic => !updatedSelectedTopics.includes(topic));

  const handleTopicSelection = (topic) => {
    setUpdatedSelectedTopics(prevTopics => {
      if (prevTopics.includes(topic)) {
        return prevTopics.filter(t => t !== topic); // Remove topic if it's already selected
      } else {
        return [...prevTopics, topic]; // Add topic if it's not selected
      }
    });
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleSubmit = () => {
    navigation.navigate('Home', { updatedTopics: updatedSelectedTopics }); // Pass updated topics
  };

  const renderTopics = () => {
    const topicsToShow = showMore ? unselectedTopics : unselectedTopics.slice(0, 11);
    return topicsToShow.map((topic, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.topicBox, updatedSelectedTopics.includes(topic) && styles.selectedTopic]}
        onPress={() => handleTopicSelection(topic)}
      >
        <Text style={styles.topicText}>{topic}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(2 / 3) * 100}%` }]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.stageTitle}>Stage 3: Select More Topics</Text>

        <ScrollView contentContainerStyle={styles.topicsContainer}>
          {renderTopics()}
          {!showMore && (
            <TouchableOpacity style={styles.showBox} onPress={handleShowMore}>
              <Text style={styles.showText}>Show More</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.7} // Sets opacity on press
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7faff',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#cc9900',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  topicBox: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedTopic: {
    backgroundColor: '#4caf50',
    borderColor: '#388e3c',
  },
  topicText: {
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  showBox:{
    padding: 10,
    backgroundColor: '#ffcc80',
    borderRadius: 10,
    marginTop: 10,
  },showText:{
    color: '#333',
    fontWeight: 'bold',
  },button:{
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'yellow',
    backgroundColor: 'lightyellow',
    paddingVertical: 15,
    paddingHorizontal: 100,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -4 }],  
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    borderWidth:0,
  },
});

export default Stage3;
