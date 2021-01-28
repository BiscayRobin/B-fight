import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ConfettiCannon from 'react-native-confetti-cannon';

class EndGame extends React.Component {
  constructor(props) {
    super(props);
  }

  whoWin() {
    console.log(global.score);
    console.log(global.advScore);
    let message = "";
    if (global.score > global.advScore) {
      message = "Well done, you won !";
    } else {
      message = "Sorry, you lost !"
    }
    return message;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{this.whoWin()}</Text>
          <Text style={styles.title}>Your score is : {global.score}</Text>
          <Text style={styles.title}>The score of your opponent is : {global.advScore}</Text>
        </View>
        <ConfettiCannon style={styles.confetti} count={200} autoStart={true} origin={{x: wp('50%'), y: hp('99%')}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#92a8d1'
    },
    confetti: {
      flex: 1,
      justifyContent: 'center',
      width: wp('50%')
    },
    titleWrapper: {
      height: hp('10%'), // 5% of height device screen
      width: wp('100%')   // 100% of width device screen
    },
    buttonWrapper: {
      height: hp('30%'), // 5% of height device screen
      width: wp('100%'),   // 100% of width device screen
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
