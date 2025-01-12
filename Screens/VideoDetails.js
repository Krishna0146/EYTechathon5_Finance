import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Linking } from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

export function VideoDetails({ route }) {
  const { videoId, post } = route.params; // Extract videoId and post from route params
  const navigation = useNavigation(); // Navigation hook for moving between screens
  const deviceWidth = Dimensions.get('window').width; // Get device width for responsive design

  // Feedback form states
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    if (name && feedback) {
      Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      {/* YouTube Player */}
      <View style={styles.videoContainer}>
        <YouTubePlayer
          videoId={videoId}
          height={(deviceWidth * 9) / 16} // Maintain 16:9 aspect ratio
          width={deviceWidth - 35} // Adjust width for proper fit
          play={true} // Auto-play the video
        />
      </View>
      <Text style={styles.destxt}>After Completion of Video , participate on the quiz to know how it helped you in financial knoowledge...</Text>
      {/* Post title and description */}
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>

      {/* Buttons for Quiz and RWS */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rwsButton} onPress={() => navigation.navigate('BankScene')}>
          <Text style={styles.buttonText}>RWS</Text>
        </TouchableOpacity>
      </View>

      {/* PDF Download Section */}
      <View style={styles.pdfContainer}>
        <TouchableOpacity
          style={styles.pdfButton}
          onPress={() =>
            Linking.openURL(
              'https://assets.openstax.org/oscms-prodcms/media/documents/PrinciplesofFinance-WEB.pdf'
            )
          }
        >
          <Icon name="download" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.pdfButtonText}>Download PDF</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback Form Section */}
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>Your Feedback on Video</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Feedback"
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    marginTop: 30,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  videoContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    bottom:-10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  postDescription: {
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quizButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  rwsButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pdfContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  pdfButton: {
    flexDirection: 'row', // Arrange icon and text side by side
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded button for a modern look
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  pdfButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10, // Space between icon and text
  },
  icon: {
    marginRight: 5, // Optional adjustment for icon alignment
  },
  feedbackContainer: {
    marginTop: 30,
    backgroundColor: '#f7f7f7',
    padding: 20,
    borderRadius: 10,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  destxt:{
    bottom:-20,
    fontSize:16,
  }
});

export default VideoDetails;
