import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Menu from './Components/Menu'
import Single from './Components/Single'
import Multi from './Components/Multi'
import AboutUs from './Components/AboutUs'
import HighScore from './Components/HighScore'
import Play from './Components/Play'
import Host from './Components/Host'
import Join from './Components/Join'
import Calculation from './Components/Games/Calculation'
import AscendingOrder from './Components/Games/AscendingOrder'
import ColoredWords from './Components/Games/ColoredWords'
import Symbols from './Components/Games/Symbols'
import Balls from './Components/Games/Balls'
import Memory from './Components/Games/Memory/Memory'
import EndGame from './Components/EndGame'
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
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Calculation" component={Calculation} options={{headerShown: false}} />
        <Stack.Screen name="AscendingOrder" component={AscendingOrder} options={{headerShown: false}} />
        <Stack.Screen name="ColoredWords" component={ColoredWords} options={{headerShown: false}} />
        <Stack.Screen name="HighScore" component={HighScore} />
        <Stack.Screen name="Play" component={Play} options={{headerShown: false}} />
        <Stack.Screen name="Symbols" component={Symbols} options={{headerShown: false}} />
        <Stack.Screen name="Memory" component={Memory} options={{headerShown: false}} />
        <Stack.Screen name="Balls" component={Balls} options={{headerShown: false}} />
        <Stack.Screen name="Host" component={Host} />
        <Stack.Screen name="Join" component={Join} />
        <Stack.Screen name="EndGame" component={EndGame} options={{headerShown: false}} />
      </Stack.Navigator>
    }</NavigationContainer>
  );
}
