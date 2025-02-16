import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Linking,
} from "react-native";
import axios from "axios";

const fallbackImage = require("../assets/banking.png"); // ✅ Local fallback image

const News = () => {
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const API_KEY = "5f62dc92772b4886b768842aa5142d1d";
  const NEWS_URL = `https://newsapi.org/v2/top-headlines?category=business&apiKey=${API_KEY}`;

  // 🔥 Fetch News (Force fresh data)
  const fetchNews = async () => {
    try {
      setRefreshing(true);

      // ✅ Append timestamp to URL to avoid caching
      const response = await axios.get(`${NEWS_URL}&_=${Date.now()}`);

      if (response.data.articles && response.data.articles.length > 0) {
        // ✅ Filter valid articles
        const filteredNews = response.data.articles.filter(
          (article) => article.title && article.url
        );
        // ✅ Force state update by setting a new array reference
        setNews([...filteredNews]);
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <Text style={styles.heading}>News</Text>
      {news.length === 0 ? (
        <Text style={styles.noNewsText}>No news available</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => `${item.url}-${index}`} // ✅ Unique keys
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          extraData={news} // ✅ Forces FlatList to re-render when data updates
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
    fontSize: 24, // Larger text size for heading
    fontWeight: "bold", // Bold text
    textAlign: "center", // Center align
    marginVertical: 10, // Space above and below
    color: "#333", // Dark color for better readability
    backgroundColor:"lightblue"
  },
};

export default News;