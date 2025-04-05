import React from "react";
import { LogBox } from 'react-native';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Screens/SplashScreen";
import HomePage from "./Screens/Home";
import LearnPage from "./Screens/LearnStream/Learn";
import News from "./Screens/News";
import LoginPage from "./Screens/Auth/Login";
import SignUpPage from "./Screens/Auth/Signup.js";
import ChatScreen from "./Screens/ChatBot";
import UserDashboard from "./Screens/LearnStream/MLearn";
import ScenarioDetail from "./Screens/LearnStream/ModuleDetail";
import Conversation from "./Screens/RealWorldStimulate/RealWorldS";
import ScenarioList from "./Screens/RealWorldStimulate/MainReal";
import BPortfolioScreen from "./Screens/portfoliobuilder/portfoliobuilder";
import EachHold from "./Screens/portfoliobuilder/EachHold";
import InvestmentScreen from "./Screens/portfoliobuilder/investments";
import DetailScreen from "./Screens/portfoliobuilder/DetailScreen";
import ModuleDetailScreen from "./Screens/LearnStream/ModuleDetail";
import ChatSearchScreen from "./Screens/SearchBot";
import BondList from "./Screens/portfoliobuilder/Bonds";
import OnboardingScreen from "./Screens/Carusel.js"

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs([
  'Warning: TNodeChildrenRenderer: Support for defaultProps will be removed'
]);
function App() {
  return (
      <NavigationContainer>
      <StatusBar barStyle="dark-content" hidden={false} />
        <Stack.Navigator initialRouteName="Slide" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomePage}/>
          <Stack.Screen name="Learn" component={LearnPage} />
          <Stack.Screen name="SNews" component={News} />
          <Stack.Screen name="modulescreen" component={ModuleDetailScreen} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignUpPage} />
          <Stack.Screen name="Bond" component={BondList} />
          <Stack.Screen name="Slide" component={OnboardingScreen} />
          <Stack.Screen name="mreal" component={ScenarioList} />
          <Stack.Screen name="chat" component={ChatScreen} />
          <Stack.Screen name="userlearn" component={UserDashboard} />
          <Stack.Screen name="conversation" component={Conversation} />
          <Stack.Screen name="real" component={ScenarioDetail} />
          <Stack.Screen name="Portfolio" component={BPortfolioScreen}/>
          <Stack.Screen name="EachHold" component={EachHold} />
          <Stack.Screen name="Investments" component={InvestmentScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="searchbot" component={ChatSearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
export default App;
