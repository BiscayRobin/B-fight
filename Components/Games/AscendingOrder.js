import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Game} from './Game'
const Separator = () => (
  <View style={styles.separator} />
);

class AscendingOrder extends Game {

  constructor(props){
    super(props);
    this.name="AscendingOrder";
    this.SCORE = 200;
    let N = 12;
    let ROWS = 3;
    let COL = N/ROWS;
    let numbers = Array(N), i = 1;
    this.wd = `${Math.floor(90 / COL) - COL * 2}%`;
    this.hd = `${Math.floor(90 / ROWS) - ROWS * 2}%`;
    this.N=12;
    this.counter=0;
    this.rows=ROWS;
    // creates an Array [1,2,...,N]
    while(i<=N) numbers[i-1]=i++;
    this.numbers=numbers;
    this.cols=COL;
    this.tab = [];
    for(let i=0;i<ROWS;i++){
      this.tab.push(this.generateRow());
    }
}

  init(){
    let N = 12;
    let ROWS = 3;
    let COL = N/ROWS;
    let numbers = Array(N), i = 1;
    this.wd = `${Math.floor(90 / COL) - COL * 2}%`;
    this.hd = `${Math.floor(90 / ROWS) - ROWS * 2}%`;
    this.N=12;
    this.counter=0;
    this.rows=ROWS;
    // creates an Array [1,2,...,N]
    while(i<=N) numbers[i-1]=i++;
    this.numbers=numbers;
    this.cols=COL;
    this.tab = [];
    for(let i=0;i<ROWS;i++){
      this.tab.push(this.generateRow());
    }
  }

  gameLost() {
    if(this.loseLives()){
      this.next();
    }
  }

  gameWon(){
    this.addToScore(this.SCORE);
    this.next();
  }

  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      this.init();
      this.forceUpdate();
    });
  }

  getNumber() {
    let index = Math.floor(Math.random() * this.numbers.length);
    let n = this.numbers[index];
    this.numbers.splice(index,1);
    return n;
  }
  countButton(n){
    if(n==this.counter+1){
      this.counter++;
      if(this.counter==this.N){
        this.gameWon();
      }
    }else if(n==this.counter){
    }else{
      this.gameLost();
    }
  }
  generateRow() {
    let items=[];
    for(let i = 0;i<this.cols;i++){
      let num = this.getNumber();
      const press = () => this.countButton(num);
      items.push(<View style={{ marginVertical:hp('1%'),marginHorizontal:wp('1%'), height:hp(this.hd),width:wp(this.wd), flex: 1, alignSelf: 'stretch', borderStyle:'solid',justifyContent:'center'}}><TouchableOpacity onPress={press} style={{backgroundColor:'#034f84' ,height:hp(this.hd),width:wp(this.wd), flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize: hp('5%')}}>{num}</Text></TouchableOpacity></View>)
    }
    return (
      <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row'}}>
        {items}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> Select the numbers in the correct order </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}> Number of health points: {global.lives}. </Text>
        </View>
        <View style={{flex:1, alignSelf:'center', height: hp('90%'),width:wp('90%')}}>
          {this.tab}
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

export default AscendingOrder
