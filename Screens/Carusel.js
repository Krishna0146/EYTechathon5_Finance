import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ Corrected import

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
      navigation.replace('Splash');
    }
  };

  return (
    <LinearGradient colors={['#1c1c3c', '#3b5998', '#007bff']} style={styles.container}>
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
              { backgroundColor: currentSlide === index ? '#fff' : '#888' }
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNextSlide}>
        <Text style={styles.buttonText}>
          {currentSlide === slides.length - 1 ? 'Start' : 'Next'}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  animation: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#ddd',
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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
  },
});

export default OnboardingScreen;