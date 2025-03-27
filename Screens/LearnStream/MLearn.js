import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  StatusBar,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from "@expo/vector-icons";

import tinycolor from "tinycolor2";

const modules = [
  {
    id: 1,
    name: "Stock Market Basics",
    title: "Basic Financial Information",
    progress: 0.1,
    icon: "chart-line",
  },
  {
    id: 2,
    name: "Technical Analysis",
    title: "Basic Financial Information",
    progress: 0.2,
    icon: "chart-area",
  },
  {
    id: 3,
    name: "Fundamental Analysis",
    title: "Basic Financial Information",
    progress: 0.3,
    icon: "balance-scale",
  },
  {
    id: 4,
    name: "Personal Finance",
    title: "Basic Financial Information",
    progress: 0.4,
    icon: "wallet",
  },
  {
    id: 5,
    name: "Introduction to Options Trading",
    title: "Basic Financial Information",
    progress: 0.6,
    icon: "robot",
  },
  {
    id: 6,
    name: "Assorted Concepts",
    title: "Basic Financial Information",
    progress: 0.5,
    icon: "stream",
  },
  {
    id: 7,
    name: "Coming Soon",
    title: "Basic Financial Information",
    progress: 1.0,
    icon: "hourglass-half",
  },
];

const colors = [
  "#ADD8E6",
  "#90EE90",
  "#FFFACD",
  "#FFDAB9",
  "#FFB6C1",
  "#E6E6FA",
  "#D3D3D3",
];

export default function UserDashboard() {
  const navigation = useNavigation(); // Get navigation object
  const currentModule = modules[0];
  const [scaleValue] = useState(new Animated.Value(1));
   useEffect(() => {
      // Set the status bar to transparent when the splash screen is displayed
      StatusBar.setBarStyle("dark-content"); // To make status bar text color dark (optional)
      StatusBar.setBackgroundColor("transparent"); // Make status bar background transparent
    }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleModulePress = (module) => {
    navigation.navigate("modulescreen", {
      moduleId: module.id,
      moduleName: module.name,
      moduleDescription: module.title,
    }); // Navigates to the ModuleDetail screen and passes module data
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground 
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn7VXmhOEyiQb00mmumqZXFPxsqIt8jHFNyg&s" }} // Replace with your image
        style={styles.header}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Financial Journey</Text>
      </ImageBackground> */}

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* <View style={styles.userSection}>
          <Text style={styles.userName}>Hello ! User Name</Text>
          <Text style={styles.start}>Start Learning ...</Text>
        </View> */}

        {/* <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.tabSection, { transform: [{ scale: scaleValue }] }]}>
            <Text>Module:</Text>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleText}>
                {String(currentModule.id).padStart(2, "0")} | {currentModule.title}
              </Text>
            </View>
            <ProgressBar progress={currentModule.progress} color="#6200ea" style={styles.progressBar} />
          </Animated.View>
        </TouchableWithoutFeedback> */}

        {/* <View style={styles.goalSection}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtqFJzJPghUaBtGm0aFpvsLaa0zvpJdBYFdg&s" }} 
              style={styles.goalImage} 
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.goalText}>
              Achieve your financial dreams with smart planning.
            </Text>
            <TouchableOpacity style={styles.goalButton}>
              <Text style={styles.goalButtonText}>Set Goal</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <Text style={styles.mainHeading}>Start Learning</Text> */}
        <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ position: "absolute", top: 18, left: 10 }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
        <Text style={styles.modulesHeading}>Learning Stream</Text>
        <View style={styles.modulesContainer}>
          {modules.map((module, index) => {
            const baseColor = colors[index];
            const darkerColor = tinycolor(baseColor).darken(10).toString();
            const textColor = tinycolor(darkerColor).isDark() ? "#fff" : "#333";

            return (
              <TouchableOpacity
                key={module.id}
                style={[styles.moduleBlock, { borderColor: baseColor }]}
                onPress={() => handleModulePress(module)}
              >
                <View
                  style={[styles.colorHalf, { backgroundColor: darkerColor }]}
                >
                  <Icon
                    name={module.icon}
                    size={24}
                    color={textColor}
                    style={{ marginBottom: 5 }}
                  />
                  <Text
                    style={[
                      styles.moduleNumber,
                      {
                        backgroundColor: tinycolor(darkerColor)
                          .darken(10)
                          .toString(),
                        color: textColor,
                        borderColor: "#333",
                      },
                    ]}
                  >
                    {String(module.id).padStart(2, "0")}
                  </Text>
                </View>
                <View style={styles.textHalf}>
                  <Text style={styles.moduleText}>{module.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 3 },
  scrollView: { flexGrow: 1 },
  modulesHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 40,
    marginBottom: 10,
    marginTop: 15,
    color: "#333",
    fontFamily: "Bebas Neue",
  },
  // mainHeading: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   marginLeft: 10,
  //   marginTop: 10,
  //   marginBottom: 10,
  //   color: "#333",
  // },
  tabSection: {
    height: 120,
    borderWidth: 2,
    borderColor: "#ADD8E6",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  moduleInfo: { height: "60%", justifyContent: "center", alignItems: "center" },
  moduleText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
    fontFamily: "monospace",
  },
  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#e0e0e0",
  },
  goalSection: { flexDirection: "row", padding: 10, marginBottom: 15 },
  imageContainer: { flex: 4, justifyContent: "center", alignItems: "center" },
  goalImage: { width: "100%", height: 120, borderRadius: 10 },
  textContainer: {
    flex: 6,
    paddingLeft: 15,
    justifyContent: "center",
    fontFamily: "monospace",
  },
  goalText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    fontFamily: "monospace",
  },
  goalButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  goalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  modulesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  // moduleBlock: { flexDirection: "column", width: "48%", margin: "1%", height: 150, borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "#ccc", backgroundColor: "#fff" },
  // colorHalf: { flex: 2, justifyContent: "center", alignItems: "center" },
  // textHalf: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10,    fontFamily:"monospace"
  // },
  // moduleNumber: { fontSize: 20, fontWeight: "bold", color: "#fff",marginLeft:-160,marginTop:45,backgroundColor:"lightgray",padding:8,borderTopRightRadius:10 },
  moduleBlock: {
    flexDirection: "column",
    width: "45%", // Maintain a two-column layout
    margin: "2.5%",
    height: 150, // Adjust height to match the image
    borderRadius: 12, // Rounded corners
    overflow: "hidden",
    backgroundColor: "#fff", // Keep a white background for contrast
    elevation: 4, // Subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  colorHalf: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center", // Ensure the icon is centered
    padding: 10,
  },

  textHalf: {
    flex: 1.5, // More space for text
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // White bottom section
    paddingHorizontal: 10,
  },

  moduleNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopRightRadius: 5,
    // borderBottomLeftRadius: 10,
    position: "absolute",
    bottom: 0, // Align to the bottom
    left: 0, // Align to the left
    // borderRadius: 5,
    // marginTop: 30,
    // borderColor:"black",
  },

  moduleText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 55, // Adjust as needed
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff", // Ensure text is readable
    fontFamily: "monospace",
    padding: 8,
    borderRadius: 5,
  },
});