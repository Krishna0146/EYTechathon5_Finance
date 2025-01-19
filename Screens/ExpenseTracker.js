import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { useTranslation } from 'react-i18next';

const ExpenseTracker = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expenses, setExpenses] = useState({});

  const categories = [
    'Housing',
    'Transportation',
    'Food & Dining',
    'Healthcare',
    'Entertainment & Recreation',
    'Education & Self-Development',
    'Savings & Investments',
    'Insurance',
  ];
  
  const { t } = useTranslation();

  const formatMonthYear = (date) =>
    date.toLocaleString('default', { month: 'short', year: 'numeric' });

  const handleAddExpense = () => {
    if (!amount || !category || !selectedDate) {
      alert('Please fill in all fields');
      return;
    }

    const expenseDate = new Date(selectedDate);
    const monthYear = formatMonthYear(expenseDate);

    setExpenses((prevExpenses) => {
      const updatedExpenses = { ...prevExpenses };
      if (!updatedExpenses[monthYear]) {
        updatedExpenses[monthYear] = {};
      }
      if (!updatedExpenses[monthYear][category]) {
        updatedExpenses[monthYear][category] = 0;
      }
      updatedExpenses[monthYear][category] += parseFloat(amount);
      return updatedExpenses;
    });

    setAmount('');
    setCategory('');
    setSelectedDate('');
  };

  const handleNavigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCategoryBlocks = () => {
    const monthYear = formatMonthYear(currentDate);
    const categoriesForMonth = expenses[monthYear] || {};

    const categoryBlocks = categories.map((cat) => ({
      category: cat,
      amount: categoriesForMonth[cat] || 0,
    }));

    return (
      <FlatList
        data={categoryBlocks}
        keyExtractor={(item) => item.category}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.categoryBlock}>
            <Text style={styles.categoryText}>{item.category}</Text>
            <Text style={styles.amountText}>Rs.{item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('Expense Tracker')}</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputBlock}>
        <Text style={styles.label}>{t('Amount')}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>{t('Category')}</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Select Category" value="" />
          {categories.map((cat, idx) => (
            <Picker.Item key={idx} label={cat} value={cat} />
          ))}
        </Picker>

        <Text style={styles.label}>{t('Date')}</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.datePickerText}>
            {selectedDate || 'Choose a Date'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Text style={styles.addButtonText}>{t('Add')}</Text>
      </TouchableOpacity>

      {/* Month Navigation */}
      <View style={styles.monthNavigation}>
        <TouchableOpacity onPress={() => handleNavigateMonth(-1)}>
          <Text style={styles.arrow}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.currentMonth}>{formatMonthYear(currentDate)}</Text>
        <TouchableOpacity onPress={() => handleNavigateMonth(1)}>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Category Blocks */}
      <View style={styles.categoryContainer}>{renderCategoryBlocks()}</View>

      {/* Calendar Modal */}
      <Modal visible={isCalendarVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setIsCalendarVisible(false);
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#007bff' },
            }}
          />
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setIsCalendarVisible(false)}>
            <Text style={styles.closeModalButtonText}>{t('Close')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 25, backgroundColor: '#ffff66', alignItems: 'center' },
  headerText: { fontSize: 23, color: 'black', fontWeight: 'bold' },
  inputBlock: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: { height: 50, borderRadius: 5, marginBottom: 10 },
  addButton: {
    margin: 10,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' ,fontSize:19,},
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  arrow: { fontSize: 24, marginHorizontal: 20, color: '#007bff' },
  currentMonth: { fontSize: 18, fontWeight: 'bold' },
  categoryContainer: { padding: 10 },
  categoryBlock: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  categoryText: { fontWeight: 'bold', marginBottom: 5 },
  amountText: { fontSize: 16, color: '#007bff' },
  datePickerButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: { color: '#007bff' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeModalButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeModalButtonText: { color: '#fff' },
});

export default ExpenseTracker;
