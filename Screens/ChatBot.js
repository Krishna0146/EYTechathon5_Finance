import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const API_URL = "http://192.168.0.189:9000"; // Change if hosted

export default function ChatScreen() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
  
    const newMessage = { text: chatInput, role: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setChatInput("");
  
    // Define the list of keywords
    const keywords = [
      "finance", "financial", "investment", "invest", "stock", "stocks", 
      "bond", "bonds", "mutual fund", "mutual funds", "digital marketing", 
      "marketing", "portfolio", "asset", "assets", "trading", "trade","price"
    ];
  
    // Convert input text to lowercase and check if any keyword exists
    const containsKeyword = keywords.some((word) => 
      chatInput.toLowerCase().includes(word)
    );
  
    if (!containsKeyword) {
      // Show irrelevant response if no keyword matches
      setMessages((prev) => [
        ...prev,
        { text: "Irrelevant data. Please ask about finance, marketing, or trading.", role: "model" }
      ]);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: chatInput, history: messages }),
      });
  
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.text, role: "model" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  return(
    <View style={styles.container}>
      <FlatList
        ref={scrollViewRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        extraData={messages} // Ensures list updates properly
        renderItem={({ item }) => (
          <View style={[styles.message, item.role === "user" ? styles.userMsg : styles.botMsg]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={chatInput}
          onChangeText={setChatInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "..." : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// (Styles remain unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    fontFamily:"monospace"
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#3399ff",
    fontFamily:"monospace"
  },
  messageText: {
    color: "#fff",
    fontFamily:"monospace"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontFamily:"monospace"
  },
});