import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Feather"; // For down arrow icon
import YouTubeIframe from "react-native-youtube-iframe"; // Import the YouTube Iframe component
import { useNavigation, useRoute } from "@react-navigation/native";

const LearnPage = () => {
  // Array of YouTube video IDs and their descriptions
  const videoData = [
    {
      module_name: "Introduction to Stock Market",
      id: "GcZW24SkbHM",
      description: "Why should you Invest?",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "C7_JHlsqFlM",
      description: "Market Intermediaries",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "SV7v5WRDtLE",
      description: "All about the Initial Public Offer (IPO)",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "HaiM8jPDEhk",
      description: "Why do stock prices fluctuate?",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "-h1R5oIL0PI",
      description: "How does a trading platform work?",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "z21PrHuEkKg",
      description: "Stock Market Index",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "1ZrF6GCLDL4",
      description: "Clearing and Settlement Process",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "Mv93KfHcWaQ",
      description: "Corporate actions (Dividends, bonuses, and buybacks)",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "5t5O0MnNJNE",
      description: "Order Types",
    },
    {
      module_name: "Introduction to Stock Market",
      id: "wt6YBnJzbm0",
      description: "Getting started",
    },
    {
      module_name: "Technical Analysis",
      id: "yzRP-mA2eiE",
      description: "Technical Analysis vs Fundamental Analysis",
    },
    {
      module_name: "Technical Analysis",
      id: "0uA1UJzTI4Q",
      description: "Setting expectations",
    },
    {
      module_name: "Technical Analysis",
      id: "RNu14To1gdM",
      description: "Chart Types",
    },
    {
      module_name: "Technical Analysis",
      id: "pYC5RfXAm-4",
      description: "Timeframes",
    },
    {
      module_name: "Technical Analysis",
      id: "37wji6rGKo4",
      description: "Key assumption of technical analysis",
    },
    {
      module_name: "Technical Analysis",
      id: "AYG2g3O7jKc",
      description: "Understanding candlestick patterns",
    },
    {
      module_name: "Technical Analysis",
      id: "mKfl8A1VOEM",
      description: "Single candlestick patterns",
    },
    {
      module_name: "Technical Analysis",
      id: "yP83rD7DjTg",
      description: "Multiple candlestick patterns",
    },
    {
      module_name: "Technical Analysis",
      id: "UBkCkBme2Hg",
      description: "Support and Resistance",
    },
    {
      module_name: "Technical Analysis",
      id: "veWVgyucBqU",
      description: "Technical indicators",
    },
    {
      module_name: "Technical Analysis",
      id: "810jmf7drFw",
      description: "Moving averages",
    },
    {
      module_name: "Technical Analysis",
      id: "4W0mOUNMWpc",
      description: "Your trading checklist",
    },
    {
      module_name: "Fundamental Analysis",
      id: "8rUc0MaMzik",
      description: "Introduction to fundamental analysis",
    },
    {
      module_name: "Fundamental Analysis",
      id: "t-Fwh57MWDY",
      description: "Mindset of an investor",
    },
    {
      module_name: "Fundamental Analysis",
      id: "pwF84tPRQu4",
      description: "How to read the annual report of a company",
    },
    {
      module_name: "Fundamental Analysis",
      id: "ukdZxF2qWfI",
      description: "Understanding the P&L statement",
    },
    {
      module_name: "Fundamental Analysis",
      id: "iH3ODZ5PYU4",
      description: "Understanding the Balance sheet statement",
    },
    {
      module_name: "Fundamental Analysis",
      id: "uJG3SVrWzlQ",
      description: "Understanding the Cash Flow Statement",
    },
    {
      module_name: "Fundamental Analysis",
      id: "s7mgGbKzs2k",
      description:
        "The connection between balance sheet, P&L statement and cash flow statement",
    },
    {
      module_name: "Fundamental Analysis",
      id: "B5HLwsehc-8",
      description: "The Financial Ratio Analysis",
    },
    {
      module_name: "Fundamental Analysis",
      id: "ByCbte_e5PE",
      description: "Quick note on Relative Valuation",
    },
    {
      module_name: "Fundamental Analysis",
      id: "Exbm-Bb5XCk",
      description: "Fundamental Investment Checklist",
    },
    {
      module_name: "Futures Trading",
      id: "J0sKv8cples",
      description: "Introduction to forwards market",
    },
    {
      module_name: "Futures Trading",
      id: "Zo3iKIh5ncI",
      description: "Introducing the futures contract",
    },
    {
      module_name: "Futures Trading",
      id: "deThGfn2CjA",
      description: "Margins",
    },
    {
      module_name: "Futures Trading",
      id: "LQTOx6TSyx4",
      description: "Leverage and Payoff",
    },
    {
      module_name: "Futures Trading",
      id: "7FGomEsahv8",
      description: "Futures trade",
    },
    {
      module_name: "Futures Trading",
      id: "jzq3rdwnyDM",
      description: "Settlement",
    },
    {
      module_name: "Futures Trading",
      id: "xMTG8gzen3Q",
      description: "Open Interest",
    },
    {
      module_name: "Futures Trading",
      id: "boJUi-qAFVk",
      description: "Shorting futures",
    },
    {
      module_name: "Futures Trading",
      id: "8BD97VpzBrI",
      description: "Overview of Contracts",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "-mO0YOTcCiQ",
      description: "Introduction to Options",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "54GRv6-18CA",
      description: "Option Jargons",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "jEHgjGrHFNU",
      description: "Long Call Payoff and Short Call Trade",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "48VEFNn2gbo",
      description: "Put Buy and Put Sell",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "Ah9Kk6MCZ7o",
      description: "Summarizing Call & Put Options",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "3J9I0U9w4Ww",
      description: "Moneyness of option",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "I7YWC_j1ocI",
      description: "The Option Greeks – Delta",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "koJQc3fqxjk",
      description: "Gamma",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "fDLJlU8OdP8",
      description: "Theta",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "2hmF5gqKEUg",
      description: "Vega",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "DLEWO3sUdno",
      description: "Options M2M and P&L calculation",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "Llp4xW2GI4s",
      description: "Physical settlement of futures and options",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "uZAZAPnsqeo",
      description: "Bull Call Spread",
    },
    {
      module_name: "Introduction to Options Trading",
      id: "IoMofuYx7cM",
      description: "The Straddle",
    },
    {
      module_name: "Assorted Concepts",
      id: "m2HiZG0Fhts",
      description: "Impact cost and how it can ruin a trade",
    },
    {
      module_name: "Assorted Concepts",
      id: "q-T2svXZ77s",
      description: "5 types of share capital",
    },
    {
      module_name: "Assorted Concepts",
      id: "hwiwWPrfWXU",
      description: "How OFS allotment is done",
    },
    {
      module_name: "Assorted Concepts",
      id: "6Zrl3ZeqqsE",
      description: "Building a mutual fund portfolio",
    },
  ];

  const route =useRoute();
  const {moduleName}=route.params;

  const navigate = useNavigation();
  const [activeTab, setActiveTab] = useState(null); // Track which tab is open
  const [selectedModule, setSelectedModule] = useState(
    "Introduction to Stock Market"
  ); // Track selected module

  const toggleTab = (index) => {
    setActiveTab(index === activeTab ? null : index); // Toggle the card open/close
  };

  // Filter videos based on selected module
  const filteredVideos = videoData.filter(
    (video) => video.module_name === selectedModule
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Learn Finance</Text>

      {/* Module Selection Dropdown */}
      <View style={styles.moduleSelectorContainer}>
        <Text style={styles.moduleSelectorLabel}>Select Module:</Text>
        <Picker
          selectedValue={selectedModule}
          style={styles.modulePicker}
          onValueChange={(itemValue) => setSelectedModule(itemValue)}
        >
          <Picker.Item
            label="Introduction to Stock Market"
            value="Introduction to Stock Market"
          />
          <Picker.Item label="Technical Analysis" value="Technical Analysis" />
          <Picker.Item
            label="Fundamental Analysis"
            value="Fundamental Analysis"
          />
          <Picker.Item label="Futures Trading" value="Futures Trading" />
          <Picker.Item
            label="Introduction to Options Trading"
            value="Introduction to Options Trading"
          />
          <Picker.Item label="Assorted Concepts" value="Assorted Concepts" />
        </Picker>
      </View>

      {filteredVideos.map((video, index) => (
        <View key={video.id} style={styles.tabContainer}>
          {/* Tab Header */}
          <TouchableOpacity
            style={styles.tabHeader}
            onPress={() => toggleTab(index)}
          >
            <Text style={styles.moduleNumber}>{index + 1}</Text>
            <Text style={styles.tabDescription}>{video.description}</Text>
            <Icon
              name={activeTab === index ? "arrow-up" : "arrow-down"}
              size={24}
              color="#6200ea"
            />
          </TouchableOpacity>

          {/* Expandable Card Section */}
          {activeTab === index && (
            <View style={styles.expandedCard}>
              {/* Video Section (50%) */}
              <View style={styles.videoContainer}>
                <YouTubeIframe height={180} play={true} videoId={video.id} />
              </View>

              {/* Feedback & Chatbot Buttons (50%) */}
              <View style={styles.feedbackContainer}>
                <TouchableOpacity style={styles.feedbackButton}>
                  <Text style={styles.feedbackButtonText}>Give Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chatbotButton}
                  onPress={() => navigate.push("chat")}
                >
                  <Text style={styles.chatbotButtonText}>Chat with Bot</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default LearnPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light and clean background color
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "600",
    color: "#6200ea", // Keeping the brand color vibrant
    marginTop: 25,
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1.5, // Letter spacing for a cleaner, airy feel
  },
  moduleSelectorContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 6,
    paddingVertical: 15,
  },
  moduleSelectorLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  modulePicker: {
    height: 55,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fafafa",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0", // Subtle border color for a polished feel
  },
  tabContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tabHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: "space-between",
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  moduleNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ea",
  },
  tabDescription: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    marginLeft: 12,
    fontFamily: "Roboto", // Cleaner font for description
  },
  expandedCard: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  videoContainer: {
    height: 158,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 18,
    backgroundColor: "#f0f0f0", // Softer background color for the video area
  },
  feedbackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  feedbackButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    alignItems: "center",
    elevation: 3, // Subtle shadow effect for buttons
  },
  chatbotButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    elevation: 3,
  },
  // feedbackButtonText: {
  //   color: "#fff",
  //   fontSize: 14,
  //   fontWeight: "500",
  // },

  // chatbotButtonText: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "500",
  // },
  feedbackButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center", // Center text horizontally
    lineHeight: 20, // Ensure text stays in a single line
    numberOfLines: 1, // Prevent text from wrapping
    ellipsizeMode: "tail", // Adds ellipsis if text is too long
  },

  chatbotButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center", // Center text horizontally
    lineHeight: 20, // Ensure text stays in a single line
    numberOfLines: 1, // Prevent text from wrapping
    ellipsizeMode: "tail", // Adds ellipsis if text is too long
  },
});