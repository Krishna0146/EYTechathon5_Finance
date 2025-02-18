import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import api from "./api";

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
      "marketing", "portfolio", "asset", "assets", "trading", "trade","price",
      "amount","Amount","money","Money","Investment","Marketing","marketing","Trading",
      "Spending","spending","Selling","selling","buying","Buying"
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
      const response = await fetch(`${api}/chat`, {
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
    padding: 12,
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
    fontFamily: "Bebas Neue",
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#228b22",
    fontFamily: "Bebas Neue",
  },
  messageText: {
    color: "#fff",
    fontFamily: "Bebas Neue",
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
    fontFamily: "Bebas Neue",
    fontSize: 16,
  },
  button: {
    marginLeft: 12,
    backgroundColor: "#228b22",
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontFamily: "Bebas Neue",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Bebas Neue",
    fontWeight: "bold", // Added bold text for the button
  },
});