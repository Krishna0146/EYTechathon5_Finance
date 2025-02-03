import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
const conversationData = [
  {
    question: "The government increases infrastructure spending in the Union Budget. What’s your move?",
    options: [
      { text: "Invest in infrastructure and construction stocks to benefit from increased spending.", response: "Great decision! Increased infrastructure spending can boost construction, cement, and steel sectors, potentially leading to strong stock growth." },
      { text: "Wait and analyze how the market reacts before making a move.", response: "A careful approach! Waiting allows you to assess the actual impact of the budget announcements before committing to an investment." }
    ]
  },
  {
    question: "The government reduces corporate tax rates to boost economic growth. What’s your strategy?",
    options: [
      { text: "Increase investments in companies that benefit from lower tax rates.", response: "Smart move! Lower corporate taxes mean higher profits for businesses, which could reflect in rising stock prices." },
      { text: "Stay invested but don’t make any immediate changes.", response: "A balanced approach! While lower taxes are positive, waiting ensures you see how companies utilize the savings before making major moves." }
    ]
  },
  {
    question: "The budget introduces new incentives for electric vehicles (EVs). What do you do?",
    options: [
      { text: "Invest in EV manufacturers and battery technology companies.", response: "Good choice! Government incentives can drive demand for EVs, benefiting companies in this sector." },
      { text: "Avoid EV stocks for now and focus on traditional automakers.", response: "A cautious stance! While EVs have long-term potential, traditional automakers might still have strong market presence in the near term." }
    ]
  },
  {
    question: "The budget raises import duties on electronics to promote domestic manufacturing. What’s your strategy?",
    options: [
      { text: "Invest in domestic electronics and semiconductor companies.", response: "Smart move! Higher import duties make domestic companies more competitive, potentially increasing their market share." },
      { text: "Avoid the sector due to potential short-term volatility.", response: "A cautious approach! Import restrictions can lead to short-term supply chain disruptions, affecting company performance." }
    ]
  },
  {
    question: "The budget introduces higher tax exemptions for long-term capital gains (LTCG) on investments. How do you react?",
    options: [
      { text: "Allocate more funds to long-term equity investments to maximize tax benefits.", response: "A wise decision! Taking advantage of tax benefits can enhance your portfolio’s overall returns." },
      { text: "Stick to your current investment strategy without making changes.", response: "A steady approach! While tax benefits are useful, maintaining a well-balanced investment plan is also crucial." }
    ]
  },
  {
    question: "The government introduces a new healthcare scheme with increased funding. What’s your investment approach?",
    options: [
      { text: "Invest in pharmaceutical and healthcare stocks.", response: "Good choice! Increased government spending can drive higher revenues for companies in the healthcare sector." },
      { text: "Avoid investing in this sector and look for other opportunities.", response: "A different strategy! While healthcare investment is promising, other sectors might present better short-term opportunities." }
    ]
  },
  {
    question: "The budget raises taxes on luxury goods to generate more revenue. How does this impact your portfolio?",
    options: [
      { text: "Reduce exposure to luxury brands and consumer goods companies.", response: "A proactive approach! Higher taxes may reduce demand for luxury products, impacting sales and stock prices." },
      { text: "Hold your current positions, as the long-term impact may be minimal.", response: "A stable strategy! The market often adjusts over time, and strong brands may continue to perform well despite tax hikes." }
    ]
  },
  {
    question: "The government announces a major push for renewable energy in the budget. What’s your move?",
    options: [
      { text: "Invest in renewable energy stocks like solar and wind power companies.", response: "Smart investment! Government support can accelerate the growth of renewable energy companies." },
      { text: "Stick with traditional energy stocks like oil and gas companies.", response: "A conservative strategy! While renewable energy has long-term potential, traditional energy stocks still hold value in the short term." }
    ]
  },
  {
    question: "The budget increases government borrowing, leading to a rise in bond yields. What do you do?",
    options: [
      { text: "Shift some investments to bonds to benefit from higher yields.", response: "Good strategy! Higher bond yields can provide stable returns and diversification in your portfolio." },
      { text: "Stay focused on equities and avoid bonds for now.", response: "A risk-taking approach! While equities offer growth, ignoring bonds entirely may lead to missed opportunities." }
    ]
  },
  {
    question: "The budget proposes a new digital currency framework for the country. How do you react?",
    options: [
      { text: "Invest in fintech and blockchain-related stocks to capitalize on digital finance growth.", response: "A forward-thinking approach! Digital currencies and fintech adoption can create new investment opportunities." },
      { text: "Avoid the sector until regulations become clearer.", response: "A careful move! Waiting for regulatory clarity ensures you avoid unnecessary risks in a volatile market." }
    ]
  }
];

export default function Conversation() {
  const [chat, setChat] = useState([{ type: "bot", text: conversationData[0].question, index: 0 }]);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const handleOptionSelect = (option, index) => {
    setAnsweredQuestions((prev) => new Set([...prev, index]));
    setChat((prevChat) => [...prevChat, { type: "user", text: option.text, index }]);
    
    setTimeout(() => {
      setChat((prevChat) => [...prevChat, { type: "bot", text: option.response }]);
      
      if (conversationData[index + 1]) {
        setTimeout(() => {
          setChat((prevChat) => [...prevChat, { type: "bot", text: conversationData[index + 1].question, index: index + 1 }]);
        }, 1000); // Delay before showing next question
      }
    }, 1000); // Delay before showing response
  };

  return (
    <View style={styles.container}>
       <Text style={styles.heading}>Real World Scenario</Text>
      <FlatList
        data={chat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.type === "user" ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            {item.type === "bot" && item.index !== undefined && conversationData[item.index].options && !answeredQuestions.has(item.index) && (
              <View>
                {conversationData[item.index].options.map((option, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.optionButton}
                    onPress={() => handleOptionSelect(option, item.index)}
                  >
                    <Text style={styles.optionText}>{option.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f4f4f4"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left", // Left-aligned
    marginVertical: 16, // Space above and below the heading
    color: "#333", // Darker color for better visibility
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#dfe6e9"
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0984e3",
    color: "#fff"
  },
  messageText: {
    fontSize: 16
  },
  optionButton: {
    backgroundColor: "#74b9ff",
    padding: 8,
    marginTop: 5,
    borderRadius: 5
  },
  optionText: {
    color: "white",
    fontSize: 14
  }
});