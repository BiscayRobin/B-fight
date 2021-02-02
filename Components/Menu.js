import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  switchChar(){
    this.mute=!this.mute;
    this.forceUpdate();
    console.log('change');
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
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> Welcome to B-fight ! </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button type="solid" raised="true" color='#034f84' title="Single Player" onPress={() => navigate('Single')} />
          <Separator />
          <Button type="solid" raised="true" color='#034f84' title=" Multi Player " onPress={() => navigate('Multi')} />
          <Separator />
          <Button type="solid" raised="true" color='#034f84' title="     About us    " onPress={() => navigate('AboutUs')}/>
          <Separator />
          <TouchableOpacity onPress={() => onpress}>
            {this.showAudio()}
          </TouchableOpacity>
        </View>
        <Separator />
        <View style={styles.textWrapper}>
          <Text style={styles.version}> Version 1.0 </Text>
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
  separator: {
    height: hp('5%'),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  audio:{
    fontSize: hp('5%')
  }
})

export default Menu
