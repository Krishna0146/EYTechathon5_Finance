import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const FinTools = ({ navigation }) => {
  const { t } = useTranslation();

  const tools = [
    { name: 'Compound Interest Calculator', description: 'Calculate the compound interest on your investments.', navigateTo: 'compound' },
    { name: 'Loan EMI Calculator', description: 'Estimate monthly EMIs for loans.',navigateTo: 'loanemical'},
    { name: 'Debt-to-Income Ratio Calculator', description: 'Calculate your debt-to-income ratio to assess financial health.' },
    { name: 'Inflation Impact Calculator', description: 'Estimate the impact of inflation on savings and investments.' },
    { name: 'Home Loan Affordability Calculator', description: 'Check how much home loan you can afford based on your income.' },
    { name: 'Break-Even Analysis Tool', description: 'Analyze the break-even point for your business or investments.' },
    { name: 'Capital Gains Tax Calculator', description: 'Estimate taxes on your capital gains.' },
    { name: 'Personal Expense Tracker', description: 'Track your daily personal expenses.' },
    { name: 'Savings Goal Calculator', description: 'Calculate how much you need to save for your financial goals.' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <Text style={styles.topSectionText}>{t('Financial Tools')}</Text>
      </View>

      {/* Main Section */}
      {tools.map((tool, index) => (
        <View key={index} style={styles.toolBox}>
          <View style={styles.toolHeader}>
            <Text style={styles.toolName}>{tool.name}</Text>
            <View style={styles.toolActions}>
              <TouchableOpacity
                style={styles.goButton}
                onPress={() => tool.navigateTo && navigation.navigate(tool.navigateTo)} // Navigate on press
              >
                <Text style={styles.goButtonText}>{t('Go')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.toolDetails}>
            <Text style={styles.toolDescription}>{tool.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  topSection: {
    backgroundColor: '#ffff66',
    flexDirection: 'row',
    padding: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: '#ffff66',
    margin: 5,
  },
  topSectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    left: 5,
    top: 20,
  },
  toolBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toolActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goButton: {
    backgroundColor: '#00cc00',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  goButtonText: {
    color: 'white',
  },
  toolDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
  },
  toolDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

export default FinTools;
