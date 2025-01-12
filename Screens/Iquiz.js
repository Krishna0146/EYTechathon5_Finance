import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const QuizPage = ({ route, navigation }) => {
  const selectedTopics = route?.params?.selectedTopics || []; // Safely access params
  const [opacityStart, setOpacityStart] = useState(1);
  const [opacitySkip, setOpacitySkip] = useState(1);

  const handleStartQuiz = () => {
    console.log("Starting quiz for topics: ", selectedTopics);
    navigation.push('STQuiz');
  };

  const handleSkipQuiz = () => {
    // Navigate to Stage3 and pass the selectedTopics as params
    navigation.navigate('SQuiz', { selectedTopics });
  };

  if (selectedTopics.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>No topics selected. Please go back and select topics.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Selected Topics</Text>
        <View style={styles.topicsContainer}>
          {selectedTopics.map((topic, index) => (
            <Text key={index} style={styles.topicText}>{topic}</Text>
          ))}
        </View>
        <Text style={styles.question}>Do you want to take the quiz?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { opacity: opacityStart }]}
            onPress={handleStartQuiz}
            onPressIn={() => setOpacityStart(0.6)} // Set opacity on press
            onPressOut={() => setOpacityStart(1)} // Reset opacity after press
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { opacity: opacitySkip }]}
            onPress={handleSkipQuiz}
            onPressIn={() => setOpacitySkip(0.6)} // Set opacity on press
            onPressOut={() => setOpacitySkip(1)} // Reset opacity after press
          >
            <Text style={styles.buttonText}>Skip Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7faff' },
  content: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  topicsContainer: { backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc', },
  topicText: { fontSize: 16, color: '#333', marginBottom: 5 },
  question: { fontSize: 18, marginBottom: 20, color: '#333' },
  buttonContainer: { marginTop: 20, width: '80%' },
  button: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: { fontSize: 16, textAlign: 'center', color: '#555' },
});

export default QuizPage;
