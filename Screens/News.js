import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Linking,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "./api";

const fallbackImage = require("../assets/banking.png"); // ✅ Local fallback image

const GEMINI_API_URL = `${api}/chat`; // Replace with your backend Gemini API URL
//const GEMINI_API_URL = `${api}`; // Replace with your backend Gemini API URL

const News = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const API_KEY = "5f62dc92772b4886b768842aa5142d1d";
  const NEWS_URL = `https://newsapi.org/v2/top-headlines?sources=the-economic-times,bloomberg,financial-times&apiKey=${API_KEY}`;
  // 🔥 Fetch News from News API
  const fetchNews = async () => {
    try {
      setRefreshing(true);

      // Fetch news articles
      const response = await axios.get(`${NEWS_URL}&_=${Date.now()}`);

      if (response.data.articles && response.data.articles.length > 0) {
        // ✅ Filter valid articles
        const filteredNews = response.data.articles.filter(
          (article) => article.title && article.url
        );
        setNews(filteredNews);
      } else {
        console.warn("No valid news articles found.");
        setNews([]); // ✅ Set empty list if no valid news
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 🔄 Refresh Handler
  const onRefresh = useCallback(() => {
    fetchNews();
  }, []);

  // ❌ Handle Image Load Errors
  const handleImageError = (index) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [index]: true,
    }));
  };

  // 🌐 Open Full Article in Browser
  const openArticle = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      alert("No URL available for this article.");
    }
  };

  // 📝 Handle Summary Button
  const handleSummary = async (item) => {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat: `Summarize the following news article: ${item.title}. Description: ${item.description}`,
          history: [],
        }),
      });

      const data = await response.json();
      Alert.alert("Summary", data.text || "No summary available.");
    } catch (error) {
      console.error("Error fetching summary:", error);
      Alert.alert("Error", "Failed to fetch summary. Please try again.");
    }
  };


  //For demo purposes, we are using a static portfolio. In a real-world scenario, you would fetch the user's portfolio from your backend or state management.
  const handleCheck = async (item) => {
    const userPortfolio = [
      { stock: "Reliance Industries", shares: 10 },
      { stock: "HDFC BANK", shares: 5 },
      { stock: "Infosys", shares: 8 },
    ];

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat: `Imagine a user holding the following stocks: ${JSON.stringify(
            userPortfolio
          )}. How does the following news reflect on the user's stocks? News: ${item.title}. Description: ${item.description}`,
          history: [],
        }),
      });

      const data = await response.json();
      Alert.alert("Impact on Portfolio", data.text || "No analysis available.");
    } catch (error) {
      console.error("Error fetching analysis:", error);
      Alert.alert("Error", "Failed to analyze news impact. Please try again.");
    }
  };

  // 📰 Render News Card
  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.card} onPress={() => openArticle(item.url)}>
      <Image
        source={
          imageErrors[index] || !item.urlToImage
            ? fallbackImage
            : { uri: item.urlToImage }
        }
        style={styles.image}
        onError={() => handleImageError(index)}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        {item.description || "No description available."}
      </Text>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {/* Summary Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSummary(item)}
        >
          <Text style={styles.buttonText}>Summary</Text>
        </TouchableOpacity>

        {/* Check Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCheck(item)}
        >
          <Text style={styles.buttonText}>Impact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 26, left: 15 }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.heading}>News</Text>
      {news.length === 0 ? (
        <Text style={styles.noNewsText}>No news available</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          extraData={news}
        />
      )}
    </View>
  );
};

// 🎨 Styles
const styles = {
  container: { flex: 1, padding: 10, backgroundColor: "#f8f9fa" },
  noNewsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
  },
  image: { width: "100%", height: 150, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
  description: { fontSize: 14, color: "gray" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    left: 30,
    marginVertical: 10,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#228b22",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
};

export default News;