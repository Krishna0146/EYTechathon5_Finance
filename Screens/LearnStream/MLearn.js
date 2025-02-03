import React, { useState } from "react";
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback,ImageBackground } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

const modules = [
  { id: 1, name: "Stock Market Basics", title: "Basic Financial Information", progress: 0.1 },
  { id: 2, name: "Technical Analysis", title: "Basic Financial Information", progress: 0.2 },
  { id: 3, name: "Fundamental Analysis", title: "Basic Financial Information", progress: 0.3 },
  { id: 4, name: "Personal Finance", title: "Basic Financial Information", progress: 0.4 },
  { id: 5, name: "Markets and Taxation", title: "Basic Financial Information", progress: 0.5 },
  { id: 6, name: "Risk Management and Trading Psychology", title: "Basic Financial Information", progress: 0.6 },
  { id: 7, name: "Trading Systems", title: "Basic Financial Information", progress: 0.7 },
  { id: 8, name: "F&O Trading", title: "Basic Financial Information", progress: 0.8 },
  { id: 9, name: "Currency, Commodity, and Govt Securities", title: "Basic Financial Information", progress: 0.9 },
  { id: 10, name: "Coming Soon", title: "Basic Financial Information", progress: 1.0 },
];

const colors = [
  "#ADD8E6", "#90EE90", "#FFFACD", "#FFDAB9", "#FFB6C1",
  "#E6E6FA", "#D3D3D3", "#FAFAD2", "#F0E68C", "#E0FFFF",
];

export default function UserDashboard() {
  const navigation = useNavigation();  // Get navigation object
  const currentModule = modules[0];
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, { toValue: 1.05, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleModulePress = (module) => {
    navigation.navigate("modulescreen", { 
      moduleId: module.id, 
      moduleName: module.name,
      moduleDescription: module.title 
    });  // Navigates to the ModuleDetail screen and passes module data
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn7VXmhOEyiQb00mmumqZXFPxsqIt8jHFNyg&s" }} // Replace with your image
        style={styles.header}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Financial Journey</Text>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.userSection}>
          <Text style={styles.userName}>Hello ! User Name</Text>
          <Text style={styles.start}>Start Learning ...</Text>
        </View>

        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.tabSection, { transform: [{ scale: scaleValue }] }]}>
            <Text>Module:</Text>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleText}>
                {String(currentModule.id).padStart(2, "0")} | {currentModule.title}
              </Text>
            </View>
            <ProgressBar progress={currentModule.progress} color="#6200ea" style={styles.progressBar} />
          </Animated.View>
        </TouchableWithoutFeedback>

        <View style={styles.goalSection}>
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
        </View>

        <View style={styles.modulesContainer}>
          {modules.map((module, index) => (
            <TouchableOpacity 
              key={module.id} 
              style={styles.moduleBlock} 
              onPress={() => handleModulePress(module)}>
              <View style={[styles.colorHalf, { backgroundColor: colors[index] }]}>
                <Text style={styles.moduleNumber}>{module.id}</Text>
              </View>
              <View style={styles.textHalf}>
                <Text style={styles.moduleText}>{module.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 3 },
  scrollView: { flexGrow: 1, marginTop: 60, paddingBottom: 80 },
  userSection: { padding: 1, alignItems: "center" },
  userName: { fontSize: 17, fontWeight: "bold", color: "#333",fontFamily:"monospace"
  },
  start: { fontSize: 14, paddingTop: 15, paddingBottom: 10, color: "#666", left: -105,    fontFamily:"monospace" },
  tabSection: { height: 120, borderWidth: 2, borderColor: "#ADD8E6", backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center", marginBottom: 15, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 2, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 6 },
  moduleInfo: { height: "60%", justifyContent: "center", alignItems: "center" },
  moduleText: { fontSize: 13, fontWeight: "bold", color: "#444", fontFamily:"monospace" },
  progressBar: { width: "100%", height: 8, borderRadius: 5, marginTop: 10, backgroundColor: "#e0e0e0" },
  goalSection: { flexDirection: "row", padding: 10, marginBottom: 15 },
  imageContainer: { flex: 4, justifyContent: "center", alignItems: "center" },
  goalImage: { width: "100%", height: 120, borderRadius: 10 },
  textContainer: { flex: 6, paddingLeft: 15, justifyContent: "center",    fontFamily:"monospace"  },
  goalText: { fontSize: 14, fontWeight: "bold", marginBottom: 10, color: "#333",    fontFamily:"monospace"  },
  goalButton: { backgroundColor: "#6200ea", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, alignSelf: "flex-start" },
  goalButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold",    fontFamily:"monospace"
  },
  modulesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 17 },
  moduleBlock: { flexDirection: "column", width: "48%", margin: "1%", height: 150, borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "#ccc", backgroundColor: "#fff" },
  colorHalf: { flex: 2, justifyContent: "center", alignItems: "center" },
  textHalf: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10,    fontFamily:"monospace"
  },
  moduleNumber: { fontSize: 20, fontWeight: "bold", color: "#fff",marginLeft:-160,marginTop:45,backgroundColor:"lightgray",padding:8,borderTopRightRadius:10 },
   header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 55, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // Ensure text is readable
    fontFamily: "monospace",
    padding: 8,
    borderRadius: 5,
  },
});
