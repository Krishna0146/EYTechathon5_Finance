import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const topicsList = [
  'Budget', 'Credit Card', 'Loans', 'Savings Account', 'Emergency Fund', 'Retirement Plans',
  'Debt Management', 'Investment Strategy', 'Financial Goals', 'Student Loans',
  'Tax Refund', 'Financial Freedom', 'Stocks', 'Bonds', 'ETFs', 'Mutual Funds',
  'Real Estate', 'Portfolio Management', 'Risk vs. Return', 'Asset Allocation',
  'Dividend Investing', 'Growth Stocks', 'Index Funds', 'Stock Market', 'Bull Market',
  'IPO', 'Securities', 'Life Insurance', 'Health Insurance', 'Insurance Policy',
  'Fraud Prevention', 'Term Life Insurance',
];

const MultiStageForm2 = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();

  const handleSelectTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleNext = () => {
    navigation.navigate('IQuiz', { selectedTopics });
  };

  const renderTopics = () => {
    const topicsToShow = showMore ? topicsList : topicsList.slice(0, 11);
    return topicsToShow.map((topic, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.topicBox,
          selectedTopics.includes(topic) && styles.selectedTopic,
        ]}
        onPress={() => handleSelectTopic(topic)}
      >
        <Text style={styles.topicText}>{topic}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '66%' }]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.stageTitle}>Stage 2: Select Known Topics</Text>

        {/* Scrollable box of topics */}
        <ScrollView contentContainerStyle={styles.topicsContainer}>
          {renderTopics()}
          {!showMore && (
            <TouchableOpacity style={styles.showMoreBox} onPress={handleShowMore}>
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Next Button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
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
  },
  stageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  showMoreBox: {
    padding: 10,
    backgroundColor: '#ffcc80',
    borderRadius: 10,
    marginTop: 10,
  },
  showMoreText: {
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'yellow',
    backgroundColor: 'lightyellow',
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -4 }],  
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
    borderWidth:0,
  },
});

export default MultiStageForm2;
