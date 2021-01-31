import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AsyncStorage } from '@react-native-async-storage/async-storage';


class HighScore extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    
  }
  render() {
    return (
      <View>
        <Text> HighScore </Text>
      </View>
    )
  }
}

export default HighScore
