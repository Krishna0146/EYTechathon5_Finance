import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For down arrow icon
import YouTubeIframe from 'react-native-youtube-iframe'; // Import the YouTube Iframe component
import { useNavigation } from '@react-navigation/native';

const LearnPage = () => {
  // Array of YouTube video IDs and their descriptions
  const videoData = [
    { id: 'YFtaS3kTMqM', description: 'How Banks Work...' },
    { id: 'UcAY6qRHlw0', description: 'Personal Finance Basics' },
    { id: 'c0TQlgoUHRE', description: 'Credit Score and Credit Reports' },
    { id: 'p5ORIeMULIg', description: 'Investment Basics' },
    { id: 'MQpbxF_RngI', description: 'Taxes in India' },
    { id: 'ifTxb9eY5jc', description: 'Insurance and Its Types' },
    { id: '3hXUz4I3wP4', description: 'Inflation' },
    { id: 'BH5r_CvsbKw', description: 'Retirement Planning' },
    { id: 'fuiiJuB7tJs', description: 'Loans' },
    { id: 'Go-VBji4q-I', description: 'Financial Fraud Awareness' },
  ];

  const navigate = useNavigation();
  const [activeTab, setActiveTab] = useState(null); // Track which tab is open

  const toggleTab = (index) => {
    setActiveTab(index === activeTab ? null : index); // Toggle the card open/close
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Learn Finance</Text>

      {videoData.map((video, index) => (
        <View key={video.id} style={styles.tabContainer}>
          {/* Tab Header */}
          <TouchableOpacity style={styles.tabHeader} onPress={() => toggleTab(index)}>
            <Text style={styles.moduleNumber}>{index + 1}</Text>
            <Text style={styles.tabDescription}>{video.description}</Text>
            <Icon name={activeTab === index ? 'arrow-up' : 'arrow-down'} size={24} color="#6200ea" />
          </TouchableOpacity>

          {/* Expandable Card Section */}
          {activeTab === index && (
            <View style={styles.expandedCard}>
              {/* Video Section (50%) */}
              <View style={styles.videoContainer}>
                <YouTubeIframe height={180} play={true} videoId={video.id} />
              </View>

              {/* Feedback & Chatbot Buttons (50%) */}
              <View style={styles.feedbackContainer}>
                <TouchableOpacity style={styles.feedbackButton}>
                  <Text style={styles.feedbackButtonText}>Give Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatbotButton} onPress={()=>navigate.push('chat')}>
                  <Text style={styles.chatbotButtonText}>Chat with Bot</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default LearnPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    margin: 20,
    textAlign: 'center',
  },
  tabContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  tabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  moduleNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  tabDescription: {
    fontSize: 16,
    color: '#333',
  },
  expandedCard: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  videoContainer: {
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
  },
  feedbackContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  feedbackButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  chatbotButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  chatbotButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});