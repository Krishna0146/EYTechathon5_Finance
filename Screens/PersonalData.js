import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";

const MultiStageForm = () => {
  const [stage, setStage] = useState(1);
  const navigation = useNavigation();

  // State for Stage 1
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');

  // Error states for validation
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (stage === 1) {
      const newErrors = {};
      if (!age.trim()) newErrors.age = 'Age is required.';
      if (!gender.trim()) newErrors.gender = 'Gender is required.';
      if (!location.trim()) newErrors.location = 'Location is required.';
      if (!occupation.trim()) newErrors.occupation = 'Occupation is required.';
      if (!education.trim()) newErrors.education = 'Education is required.';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        setErrors({});
        setStage(2);
        navigation.push("Pick");
      }
    } else if (stage < 3) {
      setStage(stage + 1); // Move to the next stage
    }
  };

  const renderStageContent = () => {
    switch (stage) {
      case 1:
        return (
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.stageTitle}>Stage 1: Enter Basic Details</Text>

            {/* Age */}
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={[styles.input, errors.age ? styles.inputError : null]}
              keyboardType="numeric"
              placeholder="Enter your age"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

            {/* Gender */}
            <Text style={styles.label}>Gender:</Text>
            <View style={[styles.pickerContainer, errors.gender ? styles.inputError : null]}>
              <Picker
                selectedValue={gender}
                style={styles.picker}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

            {/* Location */}
            <Text style={styles.label}>Location:</Text>
            <TextInput
              style={[styles.input, errors.location ? styles.inputError : null]}
              placeholder="Enter your location"
              value={location}
              onChangeText={(text) => setLocation(text)}
            />
            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

            {/* Occupation */}
            <Text style={styles.label}>Occupation:</Text>
            <TextInput
              style={[styles.input, errors.occupation ? styles.inputError : null]}
              placeholder="Enter your occupation"
              value={occupation}
              onChangeText={(text) => setOccupation(text)}
            />
            {errors.occupation && <Text style={styles.errorText}>{errors.occupation}</Text>}

            {/* Education */}
            <Text style={styles.label}>Education:</Text>
            <View style={[styles.pickerContainer, errors.education ? styles.inputError : null]}>
              <Picker
                selectedValue={education}
                style={styles.picker}
                onValueChange={(itemValue) => setEducation(itemValue)}
              >
                <Picker.Item label="Select Education Level" value="" />
                <Picker.Item label="School (Grade 1 to 10)" value="School" />
                <Picker.Item label="High School (Grade 11 to 12)" value="High School" />
                <Picker.Item label="Undergraduate (Grade 13 to 16)" value="Undergraduate" />
                <Picker.Item label="Postgraduate (17+)" value="Postgraduate" />
              </Picker>
            </View>
            {errors.education && <Text style={styles.errorText}>{errors.education}</Text>}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(stage / 3) * 100}%` }]} />
      </View>

      {/* Content */}
      <View style={styles.content}>{renderStageContent()}</View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        {stage < 3 ? (
          <TouchableOpacity style={styles.buttonTop} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.finalText}>You’ve completed all stages!</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7faff',
  },
  progressBar: {
    height: 10,
    backgroundColor: '',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#cc9900',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  stageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  buttonTop: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'yellow',
    backgroundColor: 'lightyellow',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -4 }],
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  finalText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4caf50',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default MultiStageForm;
