import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



class Host extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>Host</Text>
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
  })
  
  export default Host