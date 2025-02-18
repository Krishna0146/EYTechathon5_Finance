import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

const HomePage = () => {
  const navigate = useNavigation();
  const route = useRoute(); // Get the current route
  const { username } = route.params; // Extract username from the route params
  
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Box1 - Header Section */}
      <ImageBackground 
  source={{ uri: 'https://img.freepik.com/free-vector/digital-rupee-technology-background-design_1017-36659.jpg' }} 
  style={styles.box1}
  imageStyle={styles.box1Image}
>
  <TouchableOpacity style={styles.profileContainer}>
    <Image source={{ uri: 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png' }} style={styles.profilePic} />
    <View style={styles.profileTextContainer}>
      <Text style={styles.greeting}>Hello</Text>
      <Text style={styles.userName}>{username}</Text>
    </View>
  </TouchableOpacity>
</ImageBackground> 
      {/* Box2 - Content Section (8 Rectangular Boxes) */}
      <View style={styles.box2}>
        {/** Rows for different features */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigate.push('userlearn')}>
            <ImageBackground
              source={{ uri: 'https://f.fseo88.com/Template/Common/Image/watermark_20241216_63_w1.jpg' }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Icon name="school" size={30} color="white" style={styles.icon} />
              <Text style={styles.boxName}>{t('Learning Stream')}</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigate.push('Portfolio',{username})}>
            <ImageBackground
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGt2NB9wJaM_s70MHfMLRPyxUVSbR-PQLWpQ&s' }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Icon name="calculator" size={30} color="white" style={styles.icon} />
              <Text style={styles.boxName}>{t('Virtual Portfolio')}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigate.push('chat')}>
            <ImageBackground
              source={{ uri: 'https://media.licdn.com/dms/image/v2/D5612AQHWceLixAqd3Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1698760145207?e=2147483647&v=beta&t=TV2fLr1YTHhG7BQ5rJwnZc6eua1npAELopp483SY39U' }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Icon name="person" size={30} color="white" style={styles.icon} />
              <Text style={styles.boxName}>Financial Chatbot</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.box}
          onPress={() => navigate.push('FHealthS')}>
          <ImageBackground
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzw4dwkJbDXJqTP9O0FOAVCkzOY3OLMENfUA&s' }}
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}>
            <Icon name="stats-chart" size={30} color="white" style={styles.icon} />
            <Text style={styles.boxName}>{t('Financial HealthScore')}</Text>
          </ImageBackground>
        </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigate.push('FTools')}>
          <ImageBackground
            source={{ uri: 'https://thumbs.dreamstime.com/z/marketing-vector-flat-design-model-kits-financial-tools-element-use-to-success-creative-thinking-61389093.jpg' }}
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}>
            <Icon name="newspaper" size={30} color="white" style={styles.icon} />
            <Text style={styles.boxName}>{t('Financial Tools')}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigate.push('mreal')}>
          <ImageBackground
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBLozok7TMNauxEK8yNVaknHCa6T_vgs2Agg&s' }}
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}>
            <Icon name="trending-up" size={30} color="white" style={styles.icon} />
            <Text style={styles.boxName}>{t('Real World Stimulation')}</Text>
          </ImageBackground>
        </TouchableOpacity>
        </View>
        <View style={styles.row}>
         
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigate.push('SNews')}>
            <ImageBackground
              source={{ uri: 'https://financialchronicle.wordpress.com/files/2008/10/financial-chronicle.jpg' }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}>
              <Icon name="people" size={30} color="white" style={styles.icon} />
              <Text style={styles.boxName}>{t('News')}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f9',
  },
  box1: {
    paddingVertical: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    height: 260, // Adjust the height of box1 based on your needs
  },
  box1Image: {
    opacity: 0.8, // You can adjust the opacity if needed for better text visibility
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,

  },
  profileContainer: {
    alignItems: 'flex-start', // Align to the left
    marginLeft: -180,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    fontFamily:"Bebas Neue"
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily:"Bebas Neue"
  },
  box2: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    width: '48%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6, // Makes the images semi-transparent
  },
  imageStyle: {
    resizeMode: 'cover',
    borderRadius: 10, // Ensures the image corners match the box
  },
  icon: {
    marginBottom: 10,
    color: 'black', // Thick black color for icons
    fontWeight: 'bold', // Ensures bold appearance for supported fonts
  },
  boxName: {
    fontSize: 16,
    fontWeight: 'bold', // Makes the text thick
    color: 'black', // Black text
    textAlign: 'center',
    fontFamily:"Bebas Neue"
  },
});

export default HomePage;
