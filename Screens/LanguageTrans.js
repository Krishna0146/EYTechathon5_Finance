import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

function LangTrans() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Update global language
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('select your language')}:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => changeLanguage('eng')}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => changeLanguage('tel')}>
          <Text style={styles.buttonText}>తెలుగు</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => changeLanguage('hin')}>
          <Text style={styles.buttonText}>हिंदी</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>{t('Submit')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LangTrans;
