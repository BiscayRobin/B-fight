import React from 'react'
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Game} from './Game'

const Separator = () => (
  <View style={styles.separator} />
);

class Calculation extends Game {
  // Constructor
  constructor(props){
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
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

  // Function to generate a random calculation
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

  // Function to retrieve the answer entered by the user
  handleAnswer = (text) => {
    this.setState({ answer: text })
  }

  // Function to reset the parameter values once the round is over or the game is finished
  clear = () => {
    this.calcul = this.GenerateRandomCalcul();
    this.success = false;
    this.setState({ answer: ''});
    this.textInput.clear();
  }

  // Function that is called when the page is unmount
  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      this.clear();
      this.SCORE=0;
      this.message = '';
      this.round = 0;
      this.forceUpdate();
    });
  }

  // Function that is called once the game is over
  finish = (noMoreLives) => {
    this.addToScore(this.SCORE);
    this.round=0;
    this.clear();
    if (noMoreLives != false) {
      this.next();
    }
  }

  // Function that validates the user's response and decides whether it is correct or not.
  validate = (answer) => {
    let noMoreLives = true;
    const messageWin = ["Well done !", "Awesome !", "Great !", "Perfectenschlag !", "Splendid !"];
    const messageLose = ["Lost !", "Too bad !", "Almost !", "You can do better !", "Missed !"];
    if (answer == this.correctAnswer) {
      this.success = true;
      this.SCORE+=100;
      this.message = messageWin[Math.floor(Math.random() * 5)];
    }
    else {
      this.message = messageLose[Math.floor(Math.random() * 5)];
      noMoreLives = this.loseLives();
    }
    if (this.round == 5 || noMoreLives == false) {
      this.finish(noMoreLives);
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
          <Text style={styles.title}> Do the calculations without making a mistake ! </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}> Number of health points: {global.lives}. </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> {this.calcul} </Text>
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
