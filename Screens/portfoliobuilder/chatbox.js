import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "sent",
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Simulate auto-reply
    setTimeout(() => {
      const replyMessage = {
        text: "Thank you for your awesome support!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "received",
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <TouchableOpacity
          style={styles.chatToggle}
          onPress={() => setIsChatOpen(true)}
        >
          <Icon name="chatbubbles" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Chatbox */}
      {isChatOpen && (
        <View style={styles.chatbox}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>Jonathan Doe</Text>
            <Text style={styles.status}>Online</Text>
          </View>

          {/* Messages */}
          <ScrollView contentContainerStyle={styles.messagesContainer}>
            {messages.length === 0 ? (
              <Text style={styles.noMessage}>
                You don't have any messages yet!
              </Text>
            ) : (
              messages.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.message,
                    msg.type === "sent" ? styles.sent : styles.received,
                  ]}
                >
                  <Text style={styles.messageText}>{msg.text}</Text>
                  <Text style={styles.messageTime}>{msg.time}</Text>
                </View>
              ))
            )}
          </ScrollView>

          {/* Input Area */}
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              multiline
            />
            <TouchableOpacity onPress={sendMessage}>
              <Icon name="send" size={25} color="#335DFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#F5F5F5",
  },
  chatToggle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#335DFF",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  chatbox: {
    width: "90%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#888",
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 15,
  },
  noMessage: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
  message: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#335DFF",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#EEE",
  },
  messageText: {
    fontSize: 16,
    color: "#222",
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
    marginTop: 5,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    marginRight: 10,
  },
});

export default chatbox;
