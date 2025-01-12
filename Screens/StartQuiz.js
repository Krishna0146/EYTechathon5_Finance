import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample quiz questions
const quizQuestions = [
  {
    topic: 'Savings Account',
    question: 'What is the main benefit of having a savings account?',
    options: ['A) Earn interest on deposits', 'B) Access large loans', 'C) Invest in high-risk stocks', 'D) Buy insurance'],
    answer: 'A) Earn interest on deposits',
  },
  {
    topic: 'Health Insurance',
    question: 'Which of the following is typically included in a health insurance policy?',
    options: ['A) Home repairs', 'B) Pre-existing conditions', 'C) Coverage for medical treatment and hospital stays', 'D) Property insurance'],
    answer: 'C) Coverage for medical treatment and hospital stays',
  },
  {
    topic: 'Health Insurance',
    question: 'What does the term "premium" refer to in health insurance?',
    options: ['A) The amount you pay for medical expenses', 'B) The monthly fee paid to maintain health insurance coverage', 'C) The deductible amount', 'D) The maximum limit of coverage'],
    answer: 'B) The monthly fee paid to maintain health insurance coverage',
  },
  {
    topic: 'Health Insurance',
    question: 'What is a co-payment in health insurance?',
    options: ['A) The total amount the insurance covers', 'B) The amount the insured person must pay for certain medical services', 'C) The deductible amount', 'D) The monthly premium for the insurance'],
    answer: 'B) The amount the insured person must pay for certain medical services',
  },
  {
    topic: 'Savings Account',
    question: 'Which of the following factors can affect the interest rate on a savings account?',
    options: ['A) The account balance', 'B) The frequency of withdrawals', 'C) The current economic environment', 'D) All of the above'],
    answer: 'D) All of the above',
  },
];

const SQuizPage = () => {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = quizQuestions[step];

  const navigate=useNavigation()

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setAnswers([...answers, selectedOption]);
      setSelectedOption(null);
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    // Do something on final submit (like showing the results, etc.)
    console.log('Final Answers:', answers);
    navigate.push('Home')
  };

  const renderQuestion = () => (
    <View style={styles.questionBox}>
      <Text style={styles.topic}>Topic: {currentQuestion.topic}</Text>
      <Text style={styles.question}>Question: {currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <View key={index} style={styles.optionBox}>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
            onPress={() => handleOptionSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.questionNumber}>
        Question {step + 1} of {quizQuestions.length}
      </Text>
      {renderQuestion()}

      {step < quizQuestions.length - 1 ? (
        <Button title="Next Question" onPress={handleNextQuestion} />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 20,
  },
  questionNumber: {
    marginTop:40,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop:25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  topic: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    marginVertical: 10,
  },
  optionBox: {
    marginVertical: 5,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#28a745',
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SQuizPage;
