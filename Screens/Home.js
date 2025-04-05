import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const HomePage = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Box1 - Header Section */}
      <View style={styles.box1}>
        <TouchableOpacity style={styles.profileContainer}>
          <Icon name="person-circle-outline" size={80} color="white" />
          <View style={styles.profileTextContainer}>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.userName}>{username}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Box2 - Content Section (8 Rectangular Boxes) */}
      <View style={styles.box2}>
        <View style={styles.row}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigate.push('userlearn')}
            >
              <Icon name="school" size={50} color="#228b22" style={styles.icon} />
              <Text style={styles.boxName}>Learning Stream</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.box, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigate.push('mreal')}
            >
              <Icon name="trending-up" size={50} color="#228b22" style={styles.icon} />
              <Text style={styles.boxName}>Real World Scenario</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.row}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigate.push('Portfolio', { username })}
            >
              <Icon name="calculator" size={50} color="#228b22" style={styles.icon} />
              <Text style={styles.boxName}>Virtual Portfolio</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.box, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigate.push('chat')}
            >
              <Icon name="chatbubbles" size={50} color="#228b22" style={styles.icon} />
              <Text style={styles.boxName}>Financial Chatbot</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.row}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => navigate.push('SNews')}
            >
              <Icon name="newspaper" size={50} color="#228b22" style={styles.icon} />
              <Text style={styles.boxName}>News</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.box, styles.comingSoonBox, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={true}
            >
              <Icon name="construct" size={50} color="#555" style={styles.icon} />
              <Text style={styles.boxName}>Financial Tools</Text>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.row}>
          <Animated.View style={[styles.box, styles.comingSoonBox, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={true}
            >
              <Icon name="stats-chart" size={50} color="#555" style={styles.icon} />
              <Text style={styles.boxName}>Financial Health Score</Text>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.box, styles.comingSoonBox, animatedStyle]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={true}
            >
              <Icon name="link" size={50} color="#555" style={styles.icon} />
              <Text style={styles.boxName}>Link Portfolio</Text>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </TouchableOpacity>
          </Animated.View>
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
    paddingVertical: 20,
    backgroundColor: '#228b22',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    height: 200,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileTextContainer: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  comingSoonBox: {
    backgroundColor: '#ddd',
  },
  icon: {
    marginBottom: 10,
  },
  boxName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#228b22',
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default HomePage;