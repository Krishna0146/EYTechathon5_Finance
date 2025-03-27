import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import api from "./api";

export default function ChatScreen() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [webModalVisible, setWebModalVisible] = useState(false);
  const [webUrl, setWebUrl] = useState("");
  const scrollViewRef = useRef();
  const navigation = useNavigation();

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { text: chatInput, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setLoading(true);

    const isVideoQuery = chatInput.toLowerCase().includes("video");
    if (isVideoQuery) {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(chatInput)}&key=AIzaSyBs2hEx1YyzBznIZdlf-CoWAjxwFROMarQ`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          const videoUrl = `https://www.youtube.com/embed/${videoId}`;
          const videoMessage = {
            text: "🎥 Here is a video you may find helpful regarding your query",
            role: "model",
            type: "video",
            videoUrl: videoUrl,
          };
          setMessages((prev) => [...prev, videoMessage]);
        } else {
          setMessages((prev) => [
            ...prev,
            { text: "No video found for your query.", role: "model" }
          ]);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Error fetching video. Please try again later.", role: "model" }
        ]);
      } finally {
        setLoading(false);
      }
      return;
    }

    const dataMatch = chatInput.toLowerCase().match(/(\w+)\sdata/i);
    if (dataMatch) {
      const company = dataMatch[1];
      const dataMessage = {
        text: `Here is the ${company} data you are looking for`,
        role: "model",
        type: "data",
        company: company,
      };
      setMessages((prev) => [...prev, dataMessage]);
      setLoading(false);
      return;
    }

    const compareMatch = chatInput.toLowerCase().match(/compare\s(\w+)\sand\s(\w+)/i);
    if (compareMatch) {
      const company1 = compareMatch[1];
      const company2 = compareMatch[2];
      const compareMessage = {
        text: `Here is the comparison between ${company1} and ${company2}`,
        role: "model",
        type: "compare",
        company1: company1,
        company2: company2,
      };
      setMessages((prev) => [...prev, compareMessage]);
      setLoading(false);
      return;
    }

    const keywords = [
      "finance", "financial", "investment", "invest", "stock", "stocks",
      "bond", "bonds", "mutual fund", "mutual funds", "digital marketing",
      "marketing", "portfolio", "asset", "assets", "trading", "trade", "price",
      "amount", "money", "Investment", "Marketing", "Spending", "Selling",
      "buying", "Buying"
    ];
    const containsKeyword = keywords.some((word) =>
      chatInput.toLowerCase().includes(word.toLowerCase())
    );

    if (!containsKeyword) {
      const irrelevantMsg = {
        text: "⚠ Irrelevant data. Please ask about finance, marketing, or trading.",
        role: "model",
      };
      setMessages((prev) => [...prev, irrelevantMsg]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${api}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: chatInput, history: messages }),
      });
      const data = await response.json();
      const botMessage = { text: data.text, role: "model" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "❌ Server error. Please try again later.", role: "model" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    if (item.type === "video") {
      return (
        <View style={[styles.message, styles.botMsg]}>
          <TouchableOpacity
            style={styles.videoButton}
            onPress={() => {
              setVideoUrl(item.videoUrl);
              setVideoModalVisible(true);
            }}
          >
            <Text style={styles.videoButtonText}>{item.text}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (item.type === "data") {
      return (
        <View style={[styles.message, styles.botMsg]}>
          <Text style={styles.messageText}>{item.text}</Text>
          <TouchableOpacity
            style={styles.dataButton}
            onPress={() => {
              setWebUrl(`https://ticker.finology.in/company/${item.company}`);
              setWebModalVisible(true);
            }}
          >
            <Text style={styles.dataButtonText}>Click here to view data</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (item.type === "compare") {
      return (
        <View style={[styles.message, styles.botMsg]}>
          <Text style={styles.messageText}>{item.text}</Text>
          <TouchableOpacity
            style={styles.dataButton}
            onPress={() => {
              setWebUrl(`https://ticker.finology.in/company/${item.company1}/${item.company2}`);
              setWebModalVisible(true);
            }}
          >
            <Text style={styles.dataButtonText}>Compare</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.message,
          item.role === "user" ? styles.userMsg : styles.botMsg,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Financial ChatBot</Text>
      </View>
      <View style={styles.headerLine} />
      <FlatList
        ref={scrollViewRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        extraData={messages}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      />

      <Modal
        visible={videoModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVideoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVideoModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
            <WebView
              source={{ uri: videoUrl }}
              style={styles.videoPlayer}
              javaScriptEnabled
              allowsFullscreenVideo
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={webModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setWebModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setWebModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
            <WebView
              source={{ uri: webUrl }}
              style={styles.videoPlayer}
              javaScriptEnabled
              allowsFullscreenVideo
            />
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={chatInput}
          onChangeText={setChatInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity
          style={styles.button}
          onPress={sendMessage}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "..." : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    top: 6,
    marginRight:4,
    marginBottom:10
  },
  backButtonText: {
    top: 6,
    right: 6,
    color: "#228b22",
    fontSize: 25,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  headerLine: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  message: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#228b22",
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#228b22",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  button: {
    marginLeft: 12,
    backgroundColor: "#228b22",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  videoButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: "#228b22",
    borderWidth: 1,
  },
  videoButtonText: {
    color: "#228b22",
    fontWeight: "bold",
  },
  dataButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: "#228b22",
    borderWidth: 1,
    marginTop: 10,
  },
  dataButtonText: {
    color: "#228b22",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "60%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#f0f0f0",
    zIndex: 2,
  },
  closeButtonText: {
    fontSize: 18,
  },
  videoPlayer: {
    flex: 1,
  },
});