import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios
import { Picker } from '@react-native-picker/picker'; // Import Picker

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
      const response = await axios.post("http://192.168.68.119:3000/api/auth/register", { // Update backend URL if deployed
        username, email, password, age, gender, location, occupation, education
      });

      Alert.alert('Registration Successful', `Welcome, ${username}!`);
      const username = response.data.user.username;
      navigation.push('Home',{username});
      
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Create Password" secureTextEntry onChangeText={setPassword} value={password} />
      <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" onChangeText={setAge} value={age} />
      <TextInput style={styles.input} placeholder="Location" onChangeText={setLocation} value={location} />
      <TextInput style={styles.input} placeholder="Occupation" onChangeText={setOccupation} value={occupation} />

      {/* Gender Dropdown */}
      <Picker selectedValue={gender} style={styles.input} onValueChange={(itemValue) => setGender(itemValue)}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Others" value="others" />
      </Picker>

      {/* Education Dropdown */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8', padding: 20,
  },
  title: {
    fontSize: 36, fontWeight: 'bold', marginBottom: 30, color: '#ffcc00', fontFamily: "monospace",
  },
  input: {
    width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15,
    marginBottom: 15, borderWidth: 1, borderColor: '#ccc', fontFamily: "monospace",
  },
  button: {
    width: '100%', height: 50, backgroundColor: '#3399ff', borderRadius: 8, justifyContent: 'center',
    alignItems: 'center', marginTop: 10,
  },
  buttonText: {
    color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: "monospace",
  },
});
