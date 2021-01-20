import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Menu from './Components/Menu'
import Single from './Components/Single'
import Multi from './Components/Multi'
import Options from './Components/Options'
import AboutUs from './Components/AboutUs'
import HighScore from './Components/HighScore'
import Play from './Components/Play'
import Calculation from './Components/Games/Calculation'
import AscendingOrder from './Components/Games/AscendingOrder'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Single" component={Single} />
        <Stack.Screen name="Multi" component={Multi} />
        <Stack.Screen name="Options" component={Options} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Calculation" component={Calculation} />
        <Stack.Screen name="AscendingOrder" component={AscendingOrder} />
        <Stack.Screen name="HighScore" component={HighScore} />
        <Stack.Screen name="Play" component={Play} />
      </Stack.Navigator>
    }</NavigationContainer>
  );
}