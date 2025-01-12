import React from "react";
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Screens/SplashScreen";
import HomePage from "./Screens/Home";
import LearnPage from "./Screens/Learn";
import { VideoDetails } from "./Screens/VideoDetails";
import MultiStageForm from "./Screens/PersonalData";
import MultiStageForm2 from "./Screens/PickWords";
import QuizPage from "./Screens/Iquiz";
import Stage3 from "./Screens/SkipQuiz";
import SQuizPage from "./Screens/StartQuiz";
import ChatScreen from "./Screens/BankScenario";
import VPort from "./Screens/VirtualPortfolio";
import FinTools from "./Screens/Financial";
import News from "./Screens/News";
import InvestmentPage from "./Screens/Invest";
import ExpenseTracker from "./Screens/ExpenseTracker";
import ChatPage from "./Screens/AIMentor";
import PaymentScreen from "./Screens/Ruzopay";
import LoginPage from "./Screens/Login";
import SignUpPage from "./Screens/Signup";
import CommunityPage from "./Screens/Community";
import FinancialHealthScore from "./Screens/HealthScore";
import LangTrans from "./Screens/LanguageTrans";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomePage}/>
          <Stack.Screen name="Learn" component={LearnPage} />
          <Stack.Screen name="Video" component={VideoDetails} />
          <Stack.Screen name="PersonData" component={MultiStageForm} />
          <Stack.Screen name="Pick" component={MultiStageForm2} />
          <Stack.Screen name="IQuiz" component={QuizPage} />
          <Stack.Screen name="SQuiz" component={Stage3} />
          <Stack.Screen name="STQuiz" component={SQuizPage} />
          <Stack.Screen name="BankScene" component={ChatScreen} />
          <Stack.Screen name="VPort" component={VPort} />
          <Stack.Screen name="FTools" component={FinTools} />
          <Stack.Screen name="SNews" component={News} />
          <Stack.Screen name="Langtran" component={LangTrans} />
          <Stack.Screen name="Invest" component={InvestmentPage} />
          <Stack.Screen name="Expense" component={ExpenseTracker} />
          <Stack.Screen name="AImen" component={ChatPage} />
          <Stack.Screen name="Pay" component={PaymentScreen} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignUpPage} />
          <Stack.Screen name="Community" component={CommunityPage} />
          <Stack.Screen name="FHealthS" component={FinancialHealthScore} />
        </Stack.Navigator>
      </NavigationContainer>
      </I18nextProvider>
  );
}
export default App;
