import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const InvestmentPage = () => {
  const [selectedOption, setSelectedOption] = useState('Select');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedETF, setSelectedETF] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const investmentOptions = [
    'Government Schemes',
    'Fixed Deposit',
    'Recurring Deposit',
    'ETF',
    'Stocks',
    'Gold ETF',
  ];

  const etfData = [
    { name: 'SBI ETF Nifty 50', price: 220.85 },
    { name: 'Nippon India ETF Nifty 50 BeES', price: 233.3 },
    { name: 'ICICI Prudential Nifty 50 ETF', price: 230.25 },
    { name: 'UTI Nifty 50 ETF', price: 233.3 },
    { name: 'HDFC Nifty 100 ETF', price: 25.67 },
    { name: 'CPSE ETF', price: 66.05 },
    { name: 'BHARAT 22 ETF', price: 88.95 },
    { name: 'SBI ETF Sensex', price: 756.9 },
    { name: 'UTI BSE Sensex ETF', price: 752.3 },
    { name: 'Groww Gold ETF', price: 73.0 },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  const handleETFClick = (etf) => {
    setSelectedETF(etf);
    setModalVisible(true);
  };

  const handleOrder = (type) => {
    alert(`Order is placed for ${type}`);
    setModalVisible(false);
    setQuantity('');
    setPrice('');
  };

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('Investment')}</Text>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.searchFilterContainer}>
        <TextInput style={styles.searchBox} placeholder="Search..." />
        <TouchableOpacity
          style={styles.filterBox}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <Text>{selectedOption} ▼</Text>
        </TouchableOpacity>
      </View>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          {investmentOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownOption}
              onPress={() => handleOptionSelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ETF Header Box */}
      {selectedOption === 'ETF' && (
        <View style={styles.etfHeaderBox}>
          <Text style={styles.etfHeaderText}>ETF Name</Text>
          <Text style={styles.etfHeaderPrice}>{t('Current Price')}</Text>
        </View>
      )}

      {/* Content Section */}
      <ScrollView style={styles.contentContainer}>
        {selectedOption === 'ETF' &&
          etfData.map((etf, index) => (
            <TouchableOpacity
              key={index}
              style={styles.etfRow}
              onPress={() => handleETFClick(etf)}
            >
              <Text style={styles.etfName}>{etf.name}</Text>
              <Text style={styles.etfPrice}>₹{etf.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Modal for Buy/Sell */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedETF?.name}</Text>
            <Text style={styles.modalPrice}>{t('Price')}: ₹{selectedETF?.price}</Text>
            <View style={styles.line} />
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputBox}
                placeholder="Quantity"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.buyButton]}
                onPress={() => handleOrder('Buy')}
              >
                <Text style={styles.buttonText}>{t('Buy')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.sellButton]}
                onPress={() => handleOrder('Sell')}
              >
                <Text style={styles.buttonText}>{t('Sell')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <View style={styles.footerOptionBox}>
          <Text style={styles.footerOption}>{t('Watchlist')}</Text>
        </View>
        <View style={styles.footerOptionBox}>
          <Text style={styles.footerOption}>{t('Orders')}</Text>
        </View>
        <View style={styles.footerOptionBox}>
          <Text style={styles.footerOption}>{t('Portfolio')}</Text>
        </View>
        <View style={styles.footerOptionBox}>
          <Text style={styles.footerOption}>{t('Account')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#ffff66', padding: 24 },
  headerText: { color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'left' },
  searchFilterContainer: { flexDirection: 'row', padding: 10 },
  searchBox: { flex: 3, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginRight: 10 },
  filterBox: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
  dropdown: { position: 'absolute', top: 80, left: 10, right: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', zIndex: 1 },
  dropdownOption: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  contentContainer: { flex: 1, margin: 10 },
  etfHeaderBox: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f8f8f8', borderRadius: 5, marginBottom: 10 },
  etfHeaderText: { fontSize: 16, fontWeight: 'bold', color: '#007bff' },
  etfHeaderPrice: { fontSize: 16, fontWeight: 'bold', color: '#007bff' },
  etfRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  etfName: { fontSize: 16 },
  etfPrice: { fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#000' },
  modalPrice: { fontSize: 16, marginBottom: 20, color: '#000' },
  line: { height: 1, backgroundColor: '#ccc', width: '100%', marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  inputBox: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginHorizontal: 5 },
  buttonRow: { flexDirection: 'row' },
  actionButton: { flex: 1, padding: 15, borderRadius: 5, marginHorizontal: 5, alignItems: 'center' },
  buyButton: { backgroundColor: '#007bff' },
  sellButton: { backgroundColor: '#ff4d4d' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', padding: 5 },
  footerOptionBox: { backgroundColor: '#f8f8f8', padding: 10, borderRadius: 5 },
  footerOption: { fontSize: 14, fontWeight: 'bold', color: '#007bff' },
});

export default InvestmentPage;