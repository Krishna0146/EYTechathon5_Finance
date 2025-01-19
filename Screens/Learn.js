import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const LearnPage = () => {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { t } = useTranslation();

  // Animation value for custom switch
  const translateX = useState(new Animated.Value(0))[0];

  // Array of YouTube video IDs and their thumbnails
  const videoData = [
    { id: 'YFtaS3kTMqM', thumbnail: require('../assets/Basics/bankwork.webp'), description: 'How Banks Work...' },
    { id: 'UcAY6qRHlw0', thumbnail: require('../assets/Basics/personalfin.jpg'), description: 'Personal Finance Basics' },
    { id: 'c0TQlgoUHRE', thumbnail: require('../assets/Basics/credit.png'), description: 'Credit Score and Credit Reports' },
    { id: 'p5ORIeMULIg', thumbnail: require('../assets/Basics/invest.webp'), description: 'Investment Basics' },
    { id: 'MQpbxF_RngI', thumbnail: require('../assets/Basics/taxes.webp'), description: 'Taxes in India' },
    { id: 'ifTxb9eY5jc', thumbnail: require('../assets/Basics/insurance.jpg'), description: 'Insurance and It\'s Types ' },
    { id: '3hXUz4I3wP4', thumbnail: require('../assets/Basics/inflation.jpg'), description: 'Inflation' },
    { id: 'BH5r_CvsbKw', thumbnail: require('../assets/Basics/retire.jpg'), description: 'Retirement Planning' },
    { id: 'fuiiJuB7tJs', thumbnail: require('../assets/Basics/loans.webp'), description: 'Loans' },
    { id: 'Go-VBji4q-I', thumbnail: require('../assets/Basics/fraud.png'), description: 'Financial Fraud Awareness' },
  ];

  // Array of additional trading and bonds videos
  const tradingVideos = [
    { id: 'aE-EXAMPLE', thumbnail: require('../assets/Trading1.png'), description: 'Understanding Stocks' },
    { id: 'bF-EXAMPLE', thumbnail: require('../assets/Trading2.jpg'), description: 'Bonds Explained' },
    { id: 'cF-EXAMPLE', thumbnail: require('../assets/Trading3.jpg'), description: 'Stock Market Fundamentals' },
    { id: 'dF-EXAMPLE', thumbnail: require('../assets/Trading4.jpg'), description: 'Risk Management in Trading' },
    { id: 'eF-EXAMPLE', thumbnail: require('../assets/Trading5.webp'), description: 'How to Invest in Bonds' },
  ];

  const deviceWidth = Dimensions.get('window').width;

  const handleVideoPress = (videoId, post) => {
    navigation.navigate('Video', { videoId, post });
  };

  const toggleSwitch = () => {
    setIsSwitchOn((prevState) => !prevState);
    Animated.spring(translateX, {
      toValue: isSwitchOn ? 0 : 20, // Move the slider when the switch is toggled
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/train.jpg')} style={styles.image} />
      </View>

      {/* Styled Initial Text */}
      <Text style={styles.initialText}>{t('Basics')}</Text>

      {/* Horizontal Scroll for Video Thumbnails */}
      <ScrollView horizontal style={styles.horizontalScroll}>
        {videoData.map((video, index) => (
          <TouchableOpacity
            key={video.id}
            style={styles.thumbnailContainer}
            onPress={() => handleVideoPress(video.id, video.description)}
          >
            <Image source={video.thumbnail} style={styles.thumbnail} />
            <Text style={styles.videoDescription}>{video.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Trading and Bonds Text Section */}
      <View style={styles.tradingBondsContainer}>
        <Text style={styles.tradingBondsText}>{t('Trading and Bonds')}</Text>

        {/* Custom Switch */}
        <TouchableOpacity onPress={toggleSwitch} style={styles.switch}>
          <View style={styles.slider}>
            <Animated.View
              style={[
                styles.sliderThumb,
                { 
                  transform: [{ translateX }],
                  backgroundColor: isSwitchOn ? 'green' : 'lightsalmon', // Change color based on state
                }
              ]}
            />
          </View>
        </TouchableOpacity>

        {/* Optional Text for the Switch */}
        <Text style={styles.switchText}>{isSwitchOn ? 'ON' : 'OFF'}</Text>
      </View>

      {/* Horizontal Scroll for Additional Trading and Bonds Videos */}
      <ScrollView horizontal style={styles.horizontalScroll}>
        {tradingVideos.map((video, index) => (
          <TouchableOpacity
            key={video.id}
            style={styles.thumbnailContainer}
            onPress={() => handleVideoPress(video.id, video.description)}
          >
            <Image source={video.thumbnail} style={styles.thumbnail} />
            <Text style={styles.videoDescription}>{video.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default LearnPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20, // Ensures content is not clipped at the bottom
  },
  imageContainer: {
    height: 300, // Set a fixed height for the image section
    width: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  initialText: {
    top: 15,
    left: 15,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  horizontalScroll: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 10,
  },
  thumbnailContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  thumbnail: {
    width: 250,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  videoDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    width: 250,
  },
  tradingBondsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  tradingBondsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    marginRight: -100,
  },
  slider: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  sliderThumb: {
    position: 'absolute',
    top: 4,
    left: 9,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'lightsalmon', // Default color
  },
  switchText: {
    fontSize: 16,
    color: '#333',
  },
});
