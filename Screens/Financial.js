import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const FinTools = () => {
  const [expandedTool, setExpandedTool] = useState(null);
  const { t } = useTranslation();

  const toggleToolDetails = (tool) => {
    if (expandedTool === tool) {
      setExpandedTool(null);
    } else {
      setExpandedTool(tool);
    }
  };

  const tools = [
    { name: 'Savings Goal Calculator', description: 'Calculate how much you need to save for your financial goals.' },
    { name: 'Compound Interest Calculator', description: 'Calculate the compound interest on your investments.' },
    { name: 'Loan EMI Calculator', description: 'Estimate monthly EMIs for loans.' },
    { name: 'Debt-to-Income Ratio Calculator', description: 'Calculate your debt-to-income ratio to assess financial health.' },
    { name: 'Retirement Planning Calculator', description: 'Plan your savings to retire comfortably.' },
    { name: 'Investment Return Calculator', description: 'Estimate returns on your investments over time.' },
    { name: 'Budget Planner Tool', description: 'Help you plan and track your budget.' },
    { name: 'Net Worth Calculator', description: 'Calculate your total net worth.' },
    { name: 'Tax Calculator', description: 'Estimate your taxes based on income and deductions.' },
    { name: 'Mutual Fund SIP Calculator', description: 'Calculate SIP returns for mutual funds.' },
    { name: 'Credit Score Estimator', description: 'Estimate your credit score based on various factors.' },
    { name: 'Stock Profit/Loss Calculator', description: 'Calculate profit/loss from your stock investments.' },
    { name: 'Inflation Impact Calculator', description: 'Estimate the impact of inflation on savings and investments.' },
    { name: 'Home Loan Affordability Calculator', description: 'Check how much home loan you can afford based on your income.' },
    { name: 'Break-Even Analysis Tool', description: 'Analyze the break-even point for your business or investments.' },
    { name: 'Capital Gains Tax Calculator', description: 'Estimate taxes on your capital gains.' },
    { name: 'Personal Expense Tracker', description: 'Track your daily personal expenses.' },
    { name: 'Fixed Deposit Interest Calculator', description: 'Calculate interest earned on fixed deposits.' },
    { name: 'Portfolio Diversification Tool', description: 'Help diversify your investment portfolio.' },
    { name: 'Risk Tolerance Assessment Tool', description: 'Assess your risk tolerance for investments.' },
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
              <TouchableOpacity style={styles.goButton}>
                <Text style={styles.goButtonText}>{t('Go')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleToolDetails(tool.name)}>
                <Text style={styles.arrow}>
                  {expandedTool === tool.name ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {expandedTool === tool.name && (
            <View style={styles.toolDetails}>
              <Text style={styles.toolDescription}>{tool.description}</Text>
            </View>
          )}
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
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
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
