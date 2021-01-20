import React from 'react'
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Game from './Game'

const Separator = () => (
  <View style={styles.separator} />
);

class Calculation extends Game {
  constructor(props){
    super(props);
    this.name="Calculation";
    this.success = false;
    this.correctAnswer = 0;
    this.SCORE=0;
    this.state = {
      answer: ''
    }
    this.calcul = this.GenerateRandomCalcul();
    this.message = '';
    this.round = 0;
  }

  GenerateRandomCalcul = () => {
    var RandomNumber1 = Math.floor(Math.random() * 20) + 1;
    var RandomNumber2 = Math.floor(Math.random() * 20) + 1;
    var operation = "*+-";
    var RandomOperation = operation.charAt(Math.floor(Math.random() * 3))
    if (RandomOperation == '+') {
      this.correctAnswer = RandomNumber1 + RandomNumber2;
    } else if (RandomOperation == '-') {
      this.correctAnswer = RandomNumber1 - RandomNumber2;
    } else {
      this.correctAnswer = RandomNumber1 * RandomNumber2;
    }
    return RandomNumber1.toString() + RandomOperation + RandomNumber2.toString();
  }

  handleAnswer = (text) => {
    this.setState({ answer: text })
  }

  finish = () => {
    this.addToScore(this.SCORE);
    this.round=0;
    this.calcul = this.GenerateRandomCalcul();
    this.success = false;
    this.setState({ answer: ''});
    this.textInput.clear();
    this.next();
  }

  validate = (answer) => {
    const messageWin = ["Well done !", "Awesome !", "Great !", "Perfectenschlag !", "Splendid !"];
    const messageLose = ["Lost !", "Too bad !", "Almost !", "You can do better !", "Missed !"];
    if (answer == this.correctAnswer) {
      this.success = true;
      this.SCORE+=100;
      this.message = messageWin[Math.floor(Math.random() * 5)];
    }
    else {
      this.message = messageLose[Math.floor(Math.random() * 5)];
    }
    if (this.round == 5) {
      this.finish();
    } else {
      this.calcul = this.GenerateRandomCalcul();
      this.success = false;
      this.setState({ answer: ''});
      this.textInput.clear();
      this.round += 1;
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> Calculation </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            {this.calcul}
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <TextInput style={styles.text} autoCorrect={false}
          ref={input => { this.textInput = input }}
          underlineColorAndroid = "transparent"
          placeholder = "Answer"
          onChangeText = {this.handleAnswer} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}> {this.message} </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
              type="solid" raised="true" color='#034f84' title='Submit'
              onPress = {() => this.validate(this.state.answer)}>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#92a8d1'
  },
  titleWrapper: {
    height: hp('10%'),
    width: wp('100%')
  },
  buttonWrapper: {
    height: hp('30%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWrapper: {
    height: hp('10%'),
    width: wp('100%')
  },
  title: {
    textAlign: "center",
    fontSize: hp('5%'),
    color: '#f7786b'
  },
  text: {
    textAlign: "center",
    fontSize: hp('2%'),
    color: '#c94c4c'
  },
  separator: {
    height: hp('5%'),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default Calculation