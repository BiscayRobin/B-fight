import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ConfettiCannon from 'react-native-confetti-cannon';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EndGame extends React.Component {
  constructor(props) {
    super(props);
    this.win = false;
  }

  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      this.updateScores();
    });
  }

  async updateScores() {
    let score = await this.getData();
    if (score != null) {
      if (score.length < 10 && score.indexOf(global.score) == -1) { // less than 10 entries and entry not inside the array
        score.push(global.score);
        score.sort((a, b) => b - a);
      } else { //more than ten entries: sorts the scores than pops the last one
        if(score.indexOf(global.score) == -1){ // entry not inside the array
          score.push(global.score);
          score.sort((a, b) => b - a);
          score.pop();
        }
      }
      await this.removeData();
    } else if (global.score > 0) { // no stored data but a recent score: add to app storage
      score = [global.score];
    }else{
      score=null;
    }
    if(score!=null){
      this.storeData(score); // don't need to await the end
    }
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

  whoWin() {
    let message = "";
    if(global.multiplayer==false){
      this.win=true;
      return 'Well done!';
    }
    if (global.score > global.advScore) {
      message = "Well done, you won !";
      this.win = true;
    } else {
      message = "Sorry, you lost !"
      this.win = false;
    }
    return message;
  }

  render() {
    let msg = this.whoWin();
    let conf;
    if (this.win) {
      conf = <ConfettiCannon style={styles.confetti} count={200} autoStart={true} origin={{x: wp('50%'), y: hp('99%')}} />;
    } else {
      conf = <View></View>;
    }
    let adv;
    if(this.multiplayer){
      adv=<Text style={styles.title}>The score of your opponent is : {global.advScore}</Text>;
    }else{
      adv=<View></View>;
    }
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{msg}</Text>
          <Text style={styles.title}>Your score is : {global.score}</Text>
          {adv}
        <View style={styles.buttonWrapper}>
          <Button type="solid" raised="true" color='#034f84' title=" Menu " onPress={() => navigate('Menu')} />
        </View>
        <View style={styles.confetti}>
        {conf}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#92a8d1',
      overflow: 'hidden',
      flexDirection:'column'
    },
    confetti: {
      flex: 1
    },
    buttonWrapper: {
      height: hp('30%'),
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      textAlign: "center",
      fontSize: wp('5%'),
      color: '#f7786b'
    },
    version: {
      textAlign: "center"
    },
    separator: {
      height: hp('5%'),
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
      textAlign: "center",
      fontSize: wp('2%'),
      color: '#c94c4c'
    }
  })

  export default EndGame
