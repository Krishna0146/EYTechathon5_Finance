import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const API_URL = "http://192.168.68.119:9000"; // Update with your backend URL

export default function ChatSearchScreen({ route }) {
  const { query, searchText, type } = route.params || {};
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstQuerySent, setFirstQuerySent] = useState(false);
  const scrollViewRef = useRef();

  // Send the initial query to the backend when the screen loads
  useEffect(() => {
    if (query && !firstQuerySent) {
      sendQueryToBackend(query);
      setFirstQuerySent(true);
    }
  }, [query, firstQuerySent]);

  // Send query to backend with empty history for the first message
  const sendQueryToBackend = async (text) => {
    setLoading(true);
    try {
      // Only add the bot's response after the backend sends a reply
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: text, history: [] }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      setMessages((prev) => [
        { text, role: "user" }, // Add user message after receiving the bot response
        { text: responseData.text, role: "bot" }, // Bot's response
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        { text: "Error sending message.", role: "user" },
        { text: "Error receiving response.", role: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send user replies to the backend
  const sendUserReplyToBackend = async (text) => {
    setLoading(true);
    const newMessage = { text, role: "user" };
    setMessages((prev) => [...prev, newMessage]);

    try {
      // Send the reply to the backend
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: text, history: messages }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: responseData.text, role: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending reply:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error receiving response.", role: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle user message input
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    sendUserReplyToBackend(chatInput);
    setChatInput("");
  };

  // Render query and reply chat separately
  const renderMessageItem = ({ item }) => {
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
      {/* Display the chat messages */}
      <FlatList
        ref={scrollViewRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        extraData={messages}
        renderItem={renderMessageItem}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      />

      {/* Input section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={chatInput}
          onChangeText={setChatInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage} disabled={loading}>
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
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#3399ff",
  },
  messageText: {
    color: "#fff",
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
  },
});