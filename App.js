import React from "react";
import { StatusBar } from 'react-native';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Screens/SplashScreen";
import HomePage from "./Screens/Home";
import LearnPage from "./Screens/LearnStream/Learn";
import MultiStageForm from "./Screens/PersonalData";
import SQuizPage from "./Screens/LearnStream/StartQuiz";
import FinTools from "./Screens/FinancialCal/Financial";
import News from "./Screens/News";
import ExpenseTracker from "./Screens/ExpenseTracker";
import LoginPage from "./Screens/Login";
import SignUpPage from "./Screens/Signup";
import FinancialHealthScore from "./Screens/HealthScore";
import Notify from "./Screens/PushNotify";
import ChatScreen from "./Screens/ChatBot";
import UserDashboard from "./Screens/LearnStream/MLearn";
import ScenarioDetail from "./Screens/LearnStream/ModuleDetail";
import Conversation from "./Screens/RealWorldStimulate/RealWorldS";
import PortfolioDetails from "./Screens/VirtualPortfolio/portfoliodetails";
import PortfolioScreen from "./Screens/VirtualPortfolio/virtualportfolio";
import Portfolio from "./Screens/VirtualPortfolio/portfolios";
import SearchBar from "./Screens/VirtualPortfolio/searchbar";
import ScenarioList from "./Screens/RealWorldStimulate/MainReal";
import BPortfolioScreen from "./Screens/portfoliobuilder/portfoliobuilder";
import HDFCBANKEquity from "./Screens/portfoliobuilder/hdfcequity";
import RecordSaleScreen from "./Screens/portfoliobuilder/RecordaSaleScreen";
import InvestmentScreen from "./Screens/portfoliobuilder/investments";
import DetailScreen from "./Screens/portfoliobuilder/DetailScreen";
import CompoundInterestCalculator from "./Screens/FinancialCal/CompoundInt";
import Sectors from "./Screens/RealWorldStimulate/Sector";
import LoanEMICalculator from "./Screens/FinancialCal/LoanEMIcal";
import ModuleDetailScreen from "./Screens/LearnStream/ModuleDetail";
import ChatSearchScreen from "./Screens/SearchBot";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
      <StatusBar barStyle="dark-content" hidden={false} />
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomePage}/>
          <Stack.Screen name="Learn" component={LearnPage} />
          <Stack.Screen name="PersonData" component={MultiStageForm} />
          <Stack.Screen name="STQuiz" component={SQuizPage} />
          <Stack.Screen name="FTools" component={FinTools} />
          <Stack.Screen name="SNews" component={News} />
          <Stack.Screen name="Sector" component={Sectors} />
          <Stack.Screen name="modulescreen" component={ModuleDetailScreen} />
          <Stack.Screen name="Expense" component={ExpenseTracker} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignUpPage} />
          <Stack.Screen name="FHealthS" component={FinancialHealthScore} />
          <Stack.Screen name="Notify" component={Notify} />
          <Stack.Screen name="mreal" component={ScenarioList} />
          <Stack.Screen name="chat" component={ChatScreen} />
          <Stack.Screen name="userlearn" component={UserDashboard} />
          <Stack.Screen name="conversation" component={Conversation} />
          <Stack.Screen name="real" component={ScenarioDetail} />
          <Stack.Screen name="compound" component={CompoundInterestCalculator} />
          <Stack.Screen name="VirtualPortfolio" component={PortfolioScreen}/>
          <Stack.Screen name="portfolios" component={Portfolio} />
          <Stack.Screen name="portfoliodetails" component={PortfolioDetails} />
          <Stack.Screen name="Portfolio" component={BPortfolioScreen}/>
        <Stack.Screen name="HDFC Bank Ltd" component={HDFCBANKEquity} />
        <Stack.Screen name="Record a sale" component={RecordSaleScreen} />
        <Stack.Screen name="Investments" component={InvestmentScreen} />
        <Stack.Screen name="Add Shares of RELIANCE" component={DetailScreen} />
        <Stack.Screen name="searchbot" component={ChatSearchScreen} />
        <Stack.Screen name="loanemical" component={LoanEMICalculator} />
        </Stack.Navigator>
      </NavigationContainer>
      </I18nextProvider>
  );
}
export default App;
