import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


class HighScore extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      this.updateScores();
    });
  }

  async updateScores() {
    this.score = await this.getData();

    this.forceUpdate();
  }

  async removeData(){
    try {
      await AsyncStorage.removeItem('bfightScore');
    } catch(e) {
      alert(`Error while erasing data: ${e}`);
    }
  }

  async storeData(score){
    try {
      const jsonValue = JSON.stringify(score);
      await AsyncStorage.setItem('bfightScore', jsonValue);
    } catch (e) {
      alert(`Error while storing data: ${e}`);
    }
  }

  async getData(){
    try {
      const jsonValue = await AsyncStorage.getItem('bfightScore');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      alert(`Error while reading data: ${e}`);
      await this.removeData();
      return null;
    }
  }

  render() {
    let items = [];
    for(let score in this.score){
      items.push(<Text style={styles.text}>{this.score[score]}</Text>);
    }
    if(this.score==null){
      items=<Text style={styles.text}>No stored scores were found</Text>
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}> HighScore </Text>
        {items}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#92a8d1',
    flexDirection:'column',
    overflow: 'scroll'
  },
  title: {
    textAlign: "center",
    fontSize: wp('5%'),
    color: '#f7786b'
  },
  text: {
    textAlign: "center",
    fontSize: wp('4%'),
    color: '#eea29a'
  },
})

export default HighScore
