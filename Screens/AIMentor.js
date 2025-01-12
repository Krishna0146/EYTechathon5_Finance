import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you now?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const moneyResponse = `
    1. **Emergency Fund**: Set aside ₹3,000 for 3-6 months of essential expenses in a high-yield savings account or liquid mutual fund.
    2. **Mutual Funds (SIP)**: Invest ₹5,000 monthly in equity or hybrid mutual funds for long-term growth (10-15% returns annually).
    3. **Stock Market**: Allocate ₹2,000 for investing in individual stocks or ETFs (high risk, high reward).
    4. **Gold/PPF**: Invest ₹2,000 in gold or Public Provident Fund (PPF) for safe, long-term growth.
    5. **Side Income**: Explore freelancing or side businesses to increase income streams.
    Diversify investments and review periodically for the best growth.
`;

  const strategyResponse = `
    1. **Emergency Fund**: Set aside ₹3,000 for 3-6 months of essential expenses in a high-yield savings account or liquid mutual fund.
    2. **Mutual Funds (SIP)**: Invest ₹5,000 monthly in equity or hybrid mutual funds for long-term growth (10-15% returns annually).
    3. **Stock Market**: Allocate ₹2,000 for investing in individual stocks or ETFs (high risk, high reward).
    4. **Gold/PPF**: Invest ₹2,000 in gold or Public Provident Fund (PPF) for safe, long-term growth.
    5. **Side Income**: Explore freelancing or side businesses to increase income streams.
    Diversify investments and review periodically for the best growth.
  `;

  const handleSendMessage = () => {
    if (input.trim() === '') return;
  
    // Add user message to the list
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);
  
    // Simulate bot response based on user input
    setTimeout(() => {
      if (input.toLowerCase().includes('money') || input.toLowerCase().includes('savings')) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: strategyResponse, sender: 'bot' },
        ]);
      } else if (input.toLowerCase().includes('not work') && input.toLowerCase().includes('month')) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: moneyResponse, sender: 'bot' },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'I didn\'t quite understand that. Could you please clarify?', sender: 'bot' },
        ]);
      }
    }, 2000);
    setInput(''); // Clear the input field
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ChatBot</Text>
      </View>

      {/* Chat Window */}
      <ScrollView style={styles.chatWindow} contentContainerStyle={styles.chatContent}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              msg.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.inputField}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    top: 10,
    left: -2,
    color: '#fff',
    fontWeight: 'bold',
  },
  chatWindow: {
    flex: 1,
    padding: 10,
  },
  chatContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 10,
    borderRadius: 15,
    padding: 10,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: 'lightgrey',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatPage;
