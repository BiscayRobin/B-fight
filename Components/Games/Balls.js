import React from 'react'
import { StyleSheet, Button, View, Easing, Text, Animated, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Game } from './Game'

class Balls extends Game {
  // Constructor
  constructor(props) {
    super(props);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.name = "Balls";
    this.SCORE = 500;
    this.N = 10;
    this.minSpeed = 100;
    this.maxSpeed = 200;
    this.colors = ['#034f84', '#f7cac9', '#f7786b'];
    this.ballCount = {};
    for (let key in this.colors) {
      this.ballCount[this.colors[key]] = 0;
    }
    this.balls = this.generateBalls();
    this.state = {
      position: new Animated.ValueXY({ x: 0, y: 0 })
    };
  }

  init(){
    console.log('init');
    this.ballCount = {};
    for (let key in this.colors) {
      this.ballCount[this.colors[key]] = 0;
    }
    this.balls = this.generateBalls();
    this.state = {
      position: new Animated.ValueXY({ x: 0, y: 0 })
    };
  }

  youWon() {
    alert('Correct!');
    this.mounted=false;
    this.addToScore(this.SCORE);
    this.next();
  }

  youLose() {
    alert('Wrong!');
    this.mounted=false;
    if(this.loseLives()){
      this.next();
    }
  }

  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {      
      this.mounted=true;
      this.init();
      this.setupBalls();
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.mounted=false;
    this.balls.forEach((item, key) => {
      this.state[`position${key}`].stopAnimation();
    });
    this.init();
  }

  setupBalls() {
    this.balls.forEach((ball, key) => {
      this.setState({
        [`position${key}`]: new Animated.ValueXY({ x: ball.props.x, y: ball.props.y }),
      }, () => {
        const nBall = this.moveBall(ball.props, key);
        this.startAnim(nBall, key);
      });
    });
  }

  generateBalls() {
    const balls = [];
    for (let i = 0; i < this.N; i++) {
      let dirX = Math.random() >= 0.5 ? 1 : -1;
      let dirY = Math.random() >= 0.5 ? 1 : -1;
      let restStyles = {
        x: Math.floor(Math.random() * wp('85%')),
        y: Math.floor(Math.random() * hp('50%')),
        speedX: dirX * Math.floor(Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed),
        speedY: dirY * Math.floor(Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed)
      };
      let idx = Math.floor(Math.random() * this.colors.length);
      let color = this.colors[idx];
      this.ballCount[color]++;
      balls.push(
        <View style={[styles.ball, { backgroundColor: color }]} {...restStyles}></View>
      )
    }
    this.chosenColor = this.colors[Math.floor(Math.random() * this.colors.length)]
    return balls;
  }

  startAnim(ball, key) {
    Animated.timing(this.state[`position${key}`], {
      toValue: { x: ball.x, y: ball.y },
      easing: Easing.linear,
      duration: 1000,
      useNativeDriver: false
    }).start(() => {
      if(this.mounted){
        const pos = this.state[`position${key}`];
        pos.stopAnimation(() => {
          pos.setValue({ x: ball.x, y: ball.y });
          let nBall = this.moveBall(ball, key);
          requestAnimationFrame(() => this.startAnim(nBall, key));
        });
      }
    });
  }

  moveBall(ball) {
    const nBall = Object.assign({}, ball);
    const borderW = wp('85%');
    const borderH = hp('50%');
    nBall.x += nBall.speedX;
    nBall.y += nBall.speedY;
    if (nBall.x <= 0) { // border left
      nBall.x = 0;
      nBall.speedX *= (-1); //go the other way
    } else if (nBall.x >= borderW) {
      nBall.x = borderW;
      nBall.speedX *= (-1);
    }
    if (nBall.y <= 0) { // border up
      nBall.y = 0;
      nBall.speedY *= (-1);
    } else if (nBall.y >= borderH) {
      nBall.y = borderH;
      nBall.speedY *= (-1);
    }

    return nBall;
  }

  handleAnswer = (text) => {
    this.setState({ answer: text })
  }

  // Function that validates the user's response and decides whether it is correct or not.
  validate = (answer) => {
    if (answer == `${this.ballCount[this.chosenColor]}`) {
      this.youWon();
    }
    else {
      this.youLose();
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> Count the squares! </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}> Number of health points: {global.lives}. </Text>
        </View>
        <View style={{flex:1, overflow: 'hidden', backgroundColor: '#deeaee', width: wp('90%'), height: hp('60%'), alignSelf: 'center' }}>
          {
            this.balls.map(((ball, key) => {
              return (
                <Animated.View key={key} style={[this.state[`position${key}`] && this.state[`position${key}`].getLayout()]}>
                  {ball}
                </Animated.View>
              );
            }))
          }
        </View>
        <View style={{ backgroundColor: '#b1cbbb', width: wp('90%'), height: hp('24%'), alignSelf: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', flexDirection: 'column' }}>
            <View style={{ justifyContent: 'center' }}>
              <View style={[styles.ball, { backgroundColor: this.chosenColor, width: wp('2%'), height: wp('2%') }]}></View>
            </View>
            <TextInput style={[styles.text, { marginBottom: '1%' }]} autoCorrect={false}
              ref={input => { this.textInput = input }}
              underlineColorAndroid="transparent"
              placeholder="Answer"
              onChangeText={this.handleAnswer} />
            <Button
              type="solid" raised="true" color='#034f84' title='Submit'
              onPress={() => this.validate(this.state.answer)}>
            </Button>
          </View>
        </View>
      </View>
    );
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
    color: '#eea29a'
  },
  ball: {
    borderRadius: 10,
    width: wp('5%'),
    height: wp('5%'),
    position: 'absolute',
  }
})

export default Balls;
