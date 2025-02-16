import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LottieView
          source={require("../assets/animations/stocks.json")} // Your Lottie file
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.title}>GenAI Financial Assistant</Text>
        <Text style={styles.subtitle}>
          Smarter investing, personalized for you.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.secondaryButtonText}>
            I ALREADY HAVE AN ACCOUNT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", padding: 24, backgroundColor: "white" },
  innerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  animation: { width: 200, height: 200,}, // Adjust size as needed
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#3A3A3A", marginBottom: 5,fontFamily:"monospace" },
  subtitle: { fontSize: 16, color: "#7f8c8d", textAlign: "center", marginBottom: 30,fontFamily:"monospace" },
  buttonContainer: { paddingBottom: 20 },
  button: { backgroundColor: "#228b22", paddingVertical: 14, borderRadius: 10, alignItems: "center", marginBottom: 15 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold",fontFamily:"monospace" },
  secondaryButton: { paddingVertical: 14, borderRadius: 10, borderWidth: 1, borderColor: "#228b22", alignItems: "center" },
  secondaryButtonText: { color: "#228b22", fontSize: 16, fontWeight: "bold",fontFamily:"monospace" },
});

export default SplashScreen;
