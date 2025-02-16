import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios
import api from './api';
import LottieView from "lottie-react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(''); // OTP for verification
  const [newPassword, setNewPassword] = useState(''); // New password after OTP verification
  const [otpGenerated, setOtpGenerated] = useState(false); // Show OTP field after generating
  const [isResetPassword, setIsResetPassword] = useState(false); // Toggle for reset password
  const navigation = useNavigation();

  const CELL_COUNT = 6; // Number of OTP digits

  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [propsOtp, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  // Step 1: Generate OTP for login or reset password
  const handleGenerateOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    try {
      const response = await axios.post(`${api}/api/auth/send-otp`, { email, password });
      if (response.data.message) {
        Alert.alert('OTP Sent', 'Check your email for the OTP.');
        setOtpGenerated(true); // Show OTP input field
      } else {
        Alert.alert('Error', response.data.message || 'Failed to generate OTP.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleResetGenerateOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    try {
      const response = await axios.post(`${api}/api/auth/resetotp`, { email });
      if (response.data.message) {
        Alert.alert('OTP Sent', 'Check your email for the OTP.');
        setOtpGenerated(true); // Show OTP input field
      } else {
        Alert.alert('Error', response.data.message || 'Failed to generate OTP.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.response?.data?.message || 'Something went reset otp wrong.');
    }
  };

  // Step 2: Submit OTP for login
  const handleLogin = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }
    try {
      const response = await axios.post(`${api}/api/auth/login`, { email, otp });

      if (response.data.token) {
        Alert.alert('Login Successful', `Welcome, ${email}!`);
        const username = response.data.user.username; // Get the username
        navigation.push('Home', { username }); 
      } else {
        Alert.alert('Error', 'Invalid OTP.');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went login wrong.');
    }
  };

  // Step 3: Reset Password Logic
  const handleResetPassword = async () => {
    if (!newPassword || !otp) {
      Alert.alert('Error', 'Please enter both OTP and new password.');
      return;
    }

    try {
      const response = await axios.post(`${api}/api/auth/forgot-password`, { email, newPassword, otp });

      if (response.data.message) {
        Alert.alert('Success', 'Password reset successful');
        navigation.push('Login'); // Navigate to login after password reset
      } else {
        Alert.alert('Error', response.data.message || 'Failed to reset password.');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went reset password wrong.');
    }
  };

  const handleSignUp = () => {
    navigation.push('Signup'); // Navigate to SignUp page
  };

  // Toggle between login and password reset view
  const handleForgotPassword = () => {
    setIsResetPassword(true); // Switch to reset password view
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView 
          source={require("../assets/animations/Animation - 1739111906766.json")} 
          autoPlay 
          loop 
          style={{ width: 200, height: 200 }} 
        />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Login</Text>
          </View>
      <TextInput 
        style={styles.input} placeholder="Email" keyboardType="email-address" 
        onChangeText={setEmail} value={email}
      />
      {/* Show password field for login or reset password */}
      {!isResetPassword ? (
        <>
          <TextInput 
            style={styles.input} placeholder="Password" secureTextEntry 
            onChangeText={setPassword} value={password}
          />
          {/* Show "Generate OTP" button if OTP is not generated yet */}
          {!otpGenerated ? (
            <TouchableOpacity style={styles.button} onPress={handleGenerateOtp}>
              <Text style={styles.buttonText}>Generate OTP</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.otpContainer}>
              {/* OTP Input Field */}
              <CodeField
                ref={ref}
                {...propsOtp}
                value={otp}
                onChangeText={setOtp}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
               {/* Submit OTP Button */}
              <TouchableOpacity style={styles.otpButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Submit OTP</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <>
          {/* Reset Password Fields */}
          <TextInput 
            style={styles.input} placeholder="New Password" secureTextEntry 
            onChangeText={setNewPassword} value={newPassword}
          />
          {!otpGenerated ? (
            <TouchableOpacity style={styles.button} onPress={handleResetGenerateOtp}>
              <Text style={styles.buttonText}>Generate OTP</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.otpContainer}>
              {/* OTP Input Field */}
              <CodeField
                ref={ref}
                {...propsOtp}
                value={otp}
                onChangeText={setOtp}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
               {/* Submit OTP Button */}
              <TouchableOpacity style={styles.otpButton} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8', padding: 20 },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', fontFamily: "monospace" },
  button: { width: '100%', height: 50, backgroundColor: '#3399ff', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom:15 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: "monospace" },
  otpContainer: { flexDirection: 'row', width: '100%', marginBottom: 15 },
  otpInput: { 
    width: '70%', 
    height: 50, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    borderWidth: 1, 
    borderColor: '#ccc',
    fontFamily: "monospace"
  },
  otpButton: { 
    width: '30%', 
    height: 50, 
    backgroundColor: '#3399ff', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: -19 
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200, // Set a fixed size
},
  link: { color: '#007BFF', fontSize: 16, marginTop: 10, fontFamily: "monospace" },
  signUpContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  normalText: { fontSize: 16, color: '#555', fontFamily: "monospace" },
  signUpLink: { fontSize: 16, color: '#007BFF', textDecorationLine: 'underline', fontFamily: "monospace" },
  codeFieldRoot: {
    width: '80%',
    marginBottom: 10,
    alignSelf: 'center',
    paddingRight:22
  },
  cell: {
    width: 35,
    height: 50,
    lineHeight: 48,
    fontSize: 20,
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderColor: '#3399ff',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily:"monospace"
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
});