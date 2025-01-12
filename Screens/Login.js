import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigation();

  const handleLogin = () => {
    if (email && password) {
      Alert.alert('Login Successful', `Welcome, ${email}!`);
      navigate.push('PersonData'); // Navigate to the PersonData page after login
    } else {
      Alert.alert('Error', 'Please enter both email and password.');
    }
  };

  const handleSignUp = () => {
    navigate.push('Signup'); // Navigate to the SignUp page
  };

  return (
    <View style={styles.container}>
      {/* Replace the text title with an image */}
      <Image
        source={require('../assets/loginr.png')} // Replace with your image path
        style={styles.loginImage}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Reset instructions sent.')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign-Up Section */}
      <View style={styles.signUpContainer}>
        <Text style={styles.normalText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  loginImage: {
    width: 250, // Adjust the width
    height: 300, // Adjust the height
    marginBottom: 1, // Add spacing below the image
    resizeMode: 'contain',
    transform: [{ rotate: '7deg' }],
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
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
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  normalText: {
    fontSize: 16,
    color: '#555',
  },
  signUpLink: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline', // Makes the text look like a link
  },
});
