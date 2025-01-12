import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome! How can I help you today?', sender: 'bot' },
  ]);

  const [options, setOptions] = useState([
    'Open an Account',
    'Check Balance',
    'Withdraw Money',
  ]);

  const handleUserResponse = (choice) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: String(prevMessages.length + 1), text: choice, sender: 'user' },
    ]);

    if (choice === 'Open an Account') {
      addBotMessage('Do you have your documents ready?');
      setOptions(['Yes', 'No']);
    } else if (choice === 'Yes') {
      addBotMessage('Please submit your documents at the counter.');
      setOptions(['Submit Documents', 'Cancel']);
    } else if (choice === 'Submit Documents') {
      addBotMessage('What should you do next?');
      setOptions([
        'Hand over the required documents',
        'Say you don’t have the documents',
        'Ask if you can use someone else’s documents',
      ]);
    } else if (choice === 'Say you don’t have the documents') {
      addBotMessage(
        'That’s not the right choice. To open a savings account, you need to bring your own documents, such as your Aadhar card, PAN card, and a passport-size photo.'
      );
      addBotMessage('Once you bring your documents, I will give you an account opening form. You need to fill out the details carefully');
      addBotMessage('What should you do next?');
      setOptions([
        'Take the form and fill it out with your details',
        'Ask the bank employee to fill it out for you',
        'Leave the form blank and submit it',
      ]);
    } else if (choice === 'Ask the bank employee to fill it out for you') {
      addBotMessage(
        'That’s not correct. You should fill out the form yourself because it contains personal information like your name, address, and contact details. Don’t worry, I’m here to help if you need guidance.'
      );
      addBotMessage('After filling out the form, you need to submit the completed form along with your documents');
      addBotMessage('Then...');
      setOptions([
        'Submit the form and documents to the bank employee',
        'Keep the form and documents with you',
        'Submit only the form without the documents',
      ]);
    } else if (choice === 'Submit the form and documents to the bank employee') {
      addBotMessage(
        'That’s the correct choice! Great job! By submitting the completed form and documents, we can start processing your account.'
      );
      addBotMessage(
        'Now, I will verify your details and ask you to make an initial deposit to activate your account'
      );
      addBotMessage('What should you do next?');
      setOptions([
        'Deposit the required amount at the counter',
        'Refuse to make the deposit',
        'Ask for a loan instead of depositing money',
      ]);
    } else if (choice === 'Deposit the required amount at the counter') {
      addBotMessage(
        'Well done! That’s the right choice. By making the initial deposit, you’ll activate your savings account.'
      );
      addBotMessage(
        'You’ve successfully completed the process of opening your savings account! Would you like to continue with more practice or need assistance with anything else?'
      );
      setOptions([]);
    } else {
      addBotMessage('Let me know if you need any other assistance.');
      setOptions([]);
    }
  };

  const addBotMessage = (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: String(prevMessages.length + 1), text, sender: 'bot' },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Real World Stimulation</Text>
        <View style={styles.horizontalLine} />
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'bot' ? styles.botMessage : styles.userMessage,
            ]}
          >
            <Text style={styles.message}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleUserResponse(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#32CD32',
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'propercase',
    letterSpacing: 2,
    marginBottom: 5,
  },
  horizontalLine: {
    width: '90%',
    height: 2,
    backgroundColor: '#ccc',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: '75%',
  },
  botMessage: {
    backgroundColor: '#d1e7ff',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#c3f7c3',
    alignSelf: 'flex-end',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    marginTop: 10,
    flexDirection: 'column',
  },
  optionButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChatBot;
