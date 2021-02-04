import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Separator = () => (
  <View style={styles.separator} />
);

class Multi extends React.Component {
  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      if(global.connected){
        global.ws.close('back to menu');
        global.ws.connected=false;
      }
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Welcome to B-fight ! </Text>
        <View style={styles.buttonWrapper}>
          <Button type="solid" raised="true" color='#034f84' title="Join Game" onPress={() => navigate('Join')} />
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
})

export default Multi
