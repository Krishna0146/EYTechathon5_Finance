import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation
import api from "../api";
import * as Animatable from 'react-native-animatable'; // Import react-native-animatable for animations

export default function Conversation() {
  const [chat, setChat] = useState([]);  // Store the conversation messages
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());  // Keep track of answered questions
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Error state to display errors

  const route = useRoute();
  const { name } = route.params;  // Get the 'name' from the route params
  const navigation = useNavigation(); // Initialize navigation

  const [index, setIndex] = useState(0);  // Track the current question index

  useEffect(() => {
    // Fetch the current question based on the currentIndex
    axios.get(`${api}/api/scenarios/${name}/question/${index}`)
      .then(response => {
        const question = response.data;
        if (question) {
          setChat(prevChat => [
            ...prevChat,
            { type: "bot", text: question.questionText, index: index, options: question.options }
          ]);
        } else if (question.message === "No more questions available") {
          // If there are no more questions, show "Thank you" message
          setChat(prevChat => [
            ...prevChat,
            { type: "bot", text: "No more questions available. Thank you for participating!", index: index }
          ]);
        }
        setLoading(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          setError(`I hope You got some knowledge about ${name}`);
        } else {
          console.error(err);
          setError("Failed to load conversation data");
        }
        setLoading(false);
      });
  }, [name, index]);  // Re-fetch data when 'name' or 'index' changes

  const handleOptionSelect = (option, questionIndex) => {
    setAnsweredQuestions(prev => new Set([...prev, questionIndex]));  // Mark the question as answered
    setChat(prevChat => [...prevChat, { type: "user", text: option.text, index: questionIndex }]);

    // Add bot's response after the user has selected an option
    setTimeout(() => {
      setChat(prevChat => [
        ...prevChat,
        { type: "bot", text: `${option.response}`, index: questionIndex }
      ]);
      // Increment the index to fetch the next question
      setIndex(prevIndex => prevIndex + 1);
    }, 1000);
  };

  useEffect(() => {
    if (error) {
      // Redirect to another page after 2 seconds
      const timeout = setTimeout(() => {
        navigation.navigate("mreal"); // Replace with your desired route
      }, 2000);

      // Clear timeout on component unmount
      return () => clearTimeout(timeout);
    }
  }, [error, navigation]); // Re-run if error state changes

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0984e3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Animatable.View
          animation="fadeOut"
          iterationCount={1} // Fade out once
          duration={2000} // Set duration for the fade-out animation
        >
          <Text style={styles.errorText}>{error}</Text>
        </Animatable.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Real World Scenario</Text>
      <FlatList
        data={chat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.type === "user" ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            {item.type === "bot" && item.index !== undefined && !answeredQuestions.has(item.index) && (
              <View>
                {item.options && item.options.map((option, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.optionButton}
                    onPress={() => handleOptionSelect(option, item.index)}
                  >
                    <Text style={styles.optionText}>{option.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f4f4f4"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 16,
    color: "#333",
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#dfe6e9"
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#228b22",
    color: "#fff"
  },
  messageText: {
    fontSize: 16
  },
  optionButton: {
    backgroundColor: "#228b22",
    padding: 8,
    marginTop: 5,
    borderRadius: 5
  },
  optionText: {
    color: "white",
    fontSize: 14
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
  },
});