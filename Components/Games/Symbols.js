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
    const l = Object.keys(images);
    l.splice(l.indexOf('interrogation_point.png'),1);
    this.imageList = l;
    this.generateSequence();
    this.AddToSelection = this.AddToSelection.bind(this);
}

  init(){
    this.selection = [];
    this.sequence=[];
    this.solution = [];
    this.generateSequence();
  }

  gameLost(){
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

  // Generate the sequence
  generateSequence(){
    const l = this.imageList;
    for(let i=0;i<this.N;i++){
      let ind = Math.floor(Math.random() * l.length);
      this.sequence.push(l[ind]);
    }
    this.solution=[...this.sequence];
    this.solution.reverse();
  }

  generateRow(list){
    let items = [];
    let i = 0;
    for(let img in list){
      img=list[img];
      items.push(
        <View key={i} style={{backgroundColor:'#034f84' , flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
          <Image style={styles.image} source={images[img]} key={i}/>
        </View>
      );
      i++;
    }
    return items;
  }

  generateClickableRow(list,onpress){
    let items = [];
    for(let i=0;i<list.length;i++){
      const img = list[i];
      items.push(
        <TouchableOpacity onPress={() => onpress(img)} style={{backgroundColor:'#034f84' , flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}} key={i}>
          <Image style={styles.image} source={images[img]} key={i}/>
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
        <Text style={styles.title}> Repeat the sequence in reverse order </Text>
        <Text style={styles.text}> Number of health points: {global.lives}. </Text>
        <View style={{flex:1, alignSelf:'center', height: hp('20%'),width:wp('90%'),flexDirection:'row',backgroundColor:'#034f84'}}>
          {this.generateRow(this.sequence)}
        </View>
        <View style={{flex:1, alignSelf:'center', height: hp('20%'),width:wp('90%'),flexDirection:'row',backgroundColor:'#034f84'}}>
          {this.generateRow(this.selection)}
        </View>
        <View style={{flex:1, alignSelf:'center', height: hp('50%'),width:wp('90%'),flexDirection:'row'}}>
          {this.generateClickableRow(this.imageList,this.AddToSelection)}
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
  buttonWrapper: {
    height: hp('30%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginVertical:hp('2%'),
    textAlign: "center",
    fontSize: wp('5%'),
    color: '#f7786b'
  },
  symbol: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: "stretch"
  },
  image: {
    width: wp('10%'),
    height: wp('10%')
  },
  text: {
    textAlign: "center",
    fontSize: wp('4%'),
    color: '#c94c4c'
  }
})

export default Symbols;
