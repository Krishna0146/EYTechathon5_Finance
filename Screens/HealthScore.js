import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const FinancialHealthScore = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('Your Financial Health Score')}</Text>
      </View>

      {/* Score Display Section */}
      <View style={styles.scoreSection}>
        <Text style={styles.sectionHeading}>{t('Your Score')}</Text>

        {/* Score Box */}
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>73</Text>
        </View>

        {/* Overall Score Section */}
        <View style={styles.overallScoreSection}>
          <Text style={styles.overallScoreHeading}>Overall Score Breakdown</Text>
          <Text style={styles.factorText}>Income Stability: <Text style={styles.factorValue}>Average</Text></Text>
          <Text style={styles.factorText}>Spending Pattern: <Text style={styles.factorValue}>Good</Text></Text>
          <Text style={styles.factorText}>Debt Management: <Text style={styles.factorValue}>Average</Text></Text>
          <Text style={styles.factorText}>Investment: <Text style={styles.factorValue}>Good</Text></Text>
          <Text style={styles.factorText}>Financial Planning: <Text style={styles.factorValue}>Poor</Text></Text>
        </View>
      </View>

      {/* Suggestions Section */}
      <View style={styles.suggestionsSection}>
        <Text style={styles.suggestionsHeading}>Areas to Improve</Text>
        <Text style={styles.suggestionText}>• Increase savings for emergencies</Text>
        <Text style={styles.suggestionText}>• Plan monthly expenses better</Text>
        <Text style={styles.suggestionText}>• Diversify investments</Text>
        <Text style={styles.suggestionText}>• Reduce debt-to-income ratio</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  header: {
    backgroundColor: '#ffff00',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    marginTop:10,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreSection: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  scoreBox: {
    alignSelf: 'center',
    backgroundColor: '#5d9bdb',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  overallScoreSection: {
    marginTop: 20,
  },
  overallScoreHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  factorText: {
    fontSize: 14,
    marginVertical: 5,
    color: '#555',
  },
  factorValue: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  suggestionsSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  suggestionsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  suggestionText: {
    fontSize: 16,
    marginVertical: 8,
    color: '#444',
  },
});

export default FinancialHealthScore;