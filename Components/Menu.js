import React from 'react'
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Audio } from 'expo-av';

const Separator = () => (
  <View style={styles.separator} />
);

class Menu extends React.Component {

  constructor(props){
    super(props);
    this.addMusic();
    this.mute = false;
    this.switchChar = this.switchChar.bind(this);
  }

  showAudio(){
    let txt;
    if(this.mute){
      txt=<Text style={styles.audio}>&#x1F507;</Text>
    }else{
      txt=<Text style={styles.audio}>&#x1F50A;</Text>
    }
    return txt;
  }

  switchChar= () =>{
    this.mute=!this.mute;
    this.forceUpdate();
    global.soundPlayer.setIsMutedAsync(this.mute);
  }

  async addMusic(){
   const { sound: playbackObject } = await Audio.Sound.createAsync(
    require('./music/battleThemeA.mp3'),
    { shouldPlay: true }
  );
    playbackObject.setIsLoopingAsync(true);
    global.soundPlayer = playbackObject;
  }

  render() {
    const { navigate } = this.props.navigation;
    const onpress = this.switchChar;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Welcome to B-fight ! </Text>
        <View style={styles.buttonWrapper}>
          <Button type="solid" raised="true" color='#034f84' title="Single Player" onPress={() => navigate('Single')} />
          <Separator />
          <Button type="solid" raised="true" color='#034f84' title=" Multi Player " onPress={() => navigate('Multi')} />
          <Separator />
          <Button type="solid" raised="true" color='#034f84' title="     About us    " onPress={() => navigate('AboutUs')}/>
          <Separator />
          <TouchableOpacity onPress={this.switchChar}>
            {this.showAudio()}
          </TouchableOpacity>
        </View>
        <Separator />
        <Text style={styles.version}> Version 1.0 </Text>
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
    height: hp('30%'), // 5% of height device screen
    width: wp('100%'),   // 100% of width device screen
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginVertical: hp('2%'),
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
  audio:{
    fontSize: hp('5%')
  }
})

export default Menu
