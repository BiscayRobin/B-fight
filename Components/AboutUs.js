import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class AboutUs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}> Who are we ? </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}> We are a community of developers and we created this application for free.  </Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}> Why ? </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}> We developed this game because
        we love programming and we want to make it fun for everyone to have fun
        while getting smarter. </Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}> Any suggestions ? </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}> If you have any suggestions to help us improve our application,
        you can contact us at this email address: suggestions@bfight.com </Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}> Do you want to thank us? </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}> If you want to thank us or give us more ways to improve our application,
        you can make a donation here: https://www.buymeacoffee.com/b-fight</Text>
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
  textWrapper: {
    height: hp('10%'), // 5% of height device screen
    width: wp('100%')   // 100% of width device screen
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
  }
})

export default AboutUs
