import React from 'react'
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Game from './Game'

const Separator = () => (
  <View style={styles.separator} />
);

class ColoredWords extends Game {
  // Constructor
  constructor(props){
    super(props);
    this.name="ColoredWords";
    this.success = false;
    this.SCORE=0;
    this.state = {
      answer: ''
    }
    this.word = "";
    this.color = "";
    this.GenerateRandomWord();
    this.message = '';
    this.round = 0;
  }

  // Function to generate a random color and word
  GenerateRandomWord = () => {
    const words = ["blue", "red", "purple", "pink", "yellow", "green", "black", "white", "brown", "orange", "grey"];
    let colors = [...words]
    this.word = words[Math.floor(Math.random() * words.length)];
    let ind = colors.indexOf(this.word);
    colors.splice(ind,1);
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  // Function to retrieve the answer entered by the user
  handleAnswer = (text) => {
    this.setState({ answer: text })
  }

  // Function to reset the parameter values once the round is over or the game is finished
  clear = () => {
    this.word = "";
    this.color = "";
    this.GenerateRandomWord();
    this.success = false;
    this.setState({ answer: ''});
    this.textInput.clear();
  }

  // Function that is called once the game is over
  finish = () => {
    this.addToScore(this.SCORE);
    this.round=0;
    this.clear();
    this.next();
  }

  // Function that validates the user's response and decides whether it is correct or not.
  validate = (answer) => {
    const messageWin = ["Well done !", "Awesome !", "Great !", "Perfectenschlag !", "Splendid !"];
    const messageLose = ["Lost !", "Too bad !", "Almost !", "You can do better !", "Missed !"];
    if (answer == this.word) {
      this.success = true;
      this.SCORE+=100;
      this.message = messageWin[Math.floor(Math.random() * messageWin.length)];
    }
    else {
      this.message = messageLose[Math.floor(Math.random() * messageLose.length)];
    }
    if (this.round == 5) {
      this.finish();
    } else {
      this.clear();
      this.round += 1;
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> Copy the word without being influenced by its color ! </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={{textAlign: "center", fontSize: hp('5%'), color: this.color}}>
            {this.word}
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

export default ColoredWords;
