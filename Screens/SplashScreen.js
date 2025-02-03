import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function SplashScreen() {
  const navigation = useNavigation();

  // Animation setup
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    // Animate opacity and scale
    opacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    scale.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.exp) });
    // Navigate to the next screen after 3 seconds
    const timeout = setTimeout(() => {
      navigation.replace("Login"); // Replace "Home" with your next screen's name
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <LinearGradient
      colors={["#ffffff", "#ffff66"]} // Matches your desired gradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 1 }} // Start from the bottom
      end={{ x: 0, y: 0 }}   // End at the top
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.View style={animatedStyle}>
          <Image
            source={require("../assets/Logos.png")} // Replace with your image path
            style={{
              width: 300,
              height: 300,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              marginTop: 0, // Space between the logo and text
              fontSize: 24, // Adjust font size
              fontWeight: "bold", // Bold text
              color: "#333", // Text color
              textAlign: "center", // Center align
              fontFamily:"monospace"
            }}
          >
            Learn Finance
          </Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}
