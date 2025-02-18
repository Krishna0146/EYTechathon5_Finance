import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { text: "Learning Content", description: "Start learning about investments today!", animation: require('../assets/animations/Main Scene (8).json') },
    { text: "Virtual Portfolio", description: "Practice investment without fear of loss.", animation: require('../assets/animations/Main Scene (1).json') },
    { text: "Financial Chatbot", description: "Your personal financial assistant!", animation: require('../assets/animations/Main Scene (3).json') },
    { text: "Financial Tools", description: "Budgeting, investing, and saving made easy.", animation: require('../assets/animations/Main Scene (9).json') },
    { text: "Real World Simulation", description: "Simulate real-life financial situations.", animation: require('../assets/animations/Main Scene (6).json') },
    { text: "News", description: "Stay informed with real-time financial news.", animation: require('../assets/animations/Main Scene (7).json') }
  ];

  const handleNextSlide = async () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('Splash'); // Navigate to the next screen
    }
  };

  return (
    <View style={styles.container}>
      <LottieView source={slides[currentSlide].animation} autoPlay loop style={styles.animation} />
      <Text style={styles.title}>{slides[currentSlide].text}</Text>
      <Text style={styles.description}>{slides[currentSlide].description}</Text>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: currentSlide === index ? '#007bff' : '#ccc' }
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNextSlide}>
        <Text style={styles.buttonText}>
          {currentSlide === slides.length - 1 ? 'Start' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Simple professional background
    padding: 20,
  },
  animation: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: '#007bff',
    borderRadius: 25,
    marginTop: 10,
    elevation: 3, // Slight shadow effect
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default OnboardingScreen;