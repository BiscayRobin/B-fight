import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ConfettiCannon from 'react-native-confetti-cannon';

class EndGame extends React.Component {
  constructor(props) {
    super(props);
    this.win = false;
  }

  whoWin() {
    console.log(global.score);
    console.log(global.advScore);
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
    console.log(this.win);
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
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{msg}</Text>
          <Text style={styles.title}>Your score is : {global.score}</Text>
          {adv}
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
      overflow: 'hidden'
    },
    confetti: {
      width: wp('50%')
    },
    titleWrapper: {
      flex: 1,
      height: hp('10%'),
      width: wp('100%'),
      alignItems:'center',
      justifyContent:'center'
    },
    buttonWrapper: {
      height: hp('30%'),
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textWrapper: {
      height: hp('10%'), // 5% of height device screen
      width: wp('100%')   // 100% of width device screen
    },
    title: {
      textAlign: "center",
      fontSize: hp('5%'),
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
      fontSize: hp('2%'),
      color: '#c94c4c'
    }
  })

  export default EndGame
