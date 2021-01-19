import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Menu from './Components/Menu'
import Single from './Components/Single'
import Multi from './Components/Multi'
import Options from './Components/Options'
import AboutUs from './Components/AboutUs'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Multi" component={Multi} />
        <Stack.Screen name="Options" component={Options} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
      </Stack.Navigator>
    }</NavigationContainer>
  );
}
