import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import LottieView from "lottie-react-native";
import api from "./api.js"

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!username || !email || !password || !age || !gender || !location || !occupation || !education) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    try {
      const response = await axios.post(`${api}/api/auth/register`, {
        username, email, password, age, gender, location, occupation, education
      });
  
      if (response.status >= 200 && response.status < 300) {
        // Successful response
        Alert.alert('Registration Successful', `Welcome, ${username}!`);
        navigation.push('Home', { username: response.data.username }); // Use the returned username directly
      } else {
        // In case response is not successful but no error is thrown
        Alert.alert('Error', 'Something went wrong.');
      }
    } catch (error) {
      console.error("Error Details:", error); // Log error details for better debugging
  
      if (error.response) {
        // If response data exists (e.g., validation error from the server)
        Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
      } else if (error.request) {
        // If no response was received
        Alert.alert('Error', 'No response from server. Please try again later.');
      } else {
        // If there was an issue with setting up the request
        Alert.alert('Error', 'Request setup failed. Please check your network connection.');
      }
    }
  };  
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <LottieView 
            source={require("../assets/animations/man-thinks.json")} 
            autoPlay 
            loop 
            style={{ width: 200, height: 200 }} 
          />
        </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder='Create Unique Username'/>

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} keyboardType="email-address" onChangeText={setEmail} value={email} placeholder='Email ( in format of sample@gmail.com )'/>

        <Text style={styles.label}>Create Password</Text>
        <TextInput style={styles.input} secureTextEntry onChangeText={setPassword} value={password} placeholder='Create Strong Password '/>

        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={setAge} value={age} placeholder='Enter Your Age'/>

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} onChangeText={setLocation} value={location} placeholder='Permanent Address'/>

        <Text style={styles.label}>Occupation</Text>
        <TextInput style={styles.input} onChangeText={setOccupation} value={occupation} placeholder='Present Occupation'/>

        <Text style={styles.label}>Gender</Text>
        <Picker selectedValue={gender} style={styles.input} onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Others" value="others" />
        </Picker>

        <Text style={styles.label}>Education</Text>
        <Picker selectedValue={education} style={styles.input} onValueChange={(itemValue) => setEducation(itemValue)}>
          <Picker.Item label="Select Education Level" value="" />
          <Picker.Item label="School" value="school" />
          <Picker.Item label="High School" value="highSchool" />
          <Picker.Item label="Undergraduate" value="underGraduate" />
          <Picker.Item label="Postgraduate" value="postGraduate" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius:10,
  },
  container: {
    width: '90%', 
    alignItems: 'center', 
    backgroundColor: '#f8f8f8',
    padding: 20, 
    borderRadius: 10,
  },
  animationContainer: {
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%', 
    height: 50, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    paddingHorizontal: 15,
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#ccc',
  },
  button: {
    width: '100%', 
    height: 50, 
    backgroundColor: '#3399ff', 
    borderRadius: 8, 
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Space below the title
  },
  headerText: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily:"monospace",
    color: '#333',
    textTransform: 'uppercase', // Makes text look more professional
    letterSpacing: 1, // Adds spacing for a refined look
  },
  loginText: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontFamily:"monospace"
  },
  loginLink: {
    color: '#3399ff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});