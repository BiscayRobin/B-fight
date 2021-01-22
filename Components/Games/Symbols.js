import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Game, images} from './Game'
const Separator = () => (
  <View style={styles.separator} />
);

class Symbols extends Game {
  
  constructor(props){
    super(props);
    this.name="Symbols";
    this.SCORE = 500;
    this.N = 5;
    this.selection = [];
    this.sequence=[];
    this.solution = [];
    this.generateSequence();
    console.log(this.sequence);
    console.log(this.solution);
    this.AddToSelection = this.AddToSelection.bind(this);
}

  init(){
    this.selection = [];
    this.sequence=[];
    this.solution = [];
    this.generateSequence();
  }

  gameLost(){
    alert('Wrong!');
    this.init();
    this.next();
  }

  gameWon(){
    alert('Correct!');
    this.init();
    this.addToScore(this.SCORE);
    this.next();
  }

  generateSequence(){
    const l = Object.keys(images);
    for(let i=0;i<this.N;i++){
      let ind = Math.floor(Math.random() * l.length);
      this.sequence.push(l[ind]);
    }
    this.solution=[...this.sequence];
    this.solution.reverse();
  }

  generateRow(list){
    let items = [];
    console.log(list);
    for(let img in list){
      img=list[img];
      items.push(
        <View style={{backgroundColor:'#034f84' , flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
          <Image style={styles.image} source={images[img]}/>
        </View>
      );
    }
    return items;
  }

  generateClickableRow(list,onpress){
    let items = [];
    for(let i=0;i<list.length;i++){
      const img = list[i];
      items.push(
        <TouchableOpacity onPress={() => onpress(img)} style={{backgroundColor:'#034f84' , flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
          <Image style={styles.image} source={images[img]}/>
        </TouchableOpacity>
      );
    }
    return items;
  }

  AddToSelection(img){
    this.selection.push(img);
    this.forceUpdate();
    if(this.selection.length>this.selection.length){
      this.gameLost();
    }
    else{
      let i = 0;
      let won = false;
      while(i<this.selection.length){
        if(this.selection[i]!=this.solution[i]){
          this.gameLost();
          won=true;
        }
        i++;
      }
      if(won==false && i==this.sequence.length){
        this.gameWon();
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> Repeat the sequence in reverse order </Text>
        </View>
        <View style={{flex:1, alignSelf:'center', height: hp('20%'),width:wp('90%'),flexDirection:'row',backgroundColor:'#034f84'}}>
          {this.generateRow(this.sequence)}
        </View>
        <View style={{flex:1, alignSelf:'center', height: hp('20%'),width:wp('90%'),flexDirection:'row',backgroundColor:'#034f84'}}>
          {this.generateRow(this.selection)}
        </View>
        <View style={{flex:1, alignSelf:'center', height: hp('50%'),width:wp('90%'),flexDirection:'row'}}>
          {this.generateClickableRow(Object.keys(images),this.AddToSelection)}
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
    fontSize: hp('5%'),
    color: '#f7786b'
  },
  version: {
    textAlign: "center"
  },
  symbol: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: "stretch"
  },
  separator: {
    height: hp('5%'),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: wp('5%'),
    height: wp('5%')
  }
})

export default Symbols;