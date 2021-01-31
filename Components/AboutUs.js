import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class AboutUs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper} >
          <Text style={styles.title}> About us </Text>
        </View>
        <View style={{height:hp('20%')}}></View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
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
    width: wp('75%'),
    alignSelf: 'center'
  },
  title: {
    textAlign: "center",
    fontSize: hp('5%'),
    color: '#f7786b'
  },
  separator: {
    height: hp('5%'),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    textAlign: "center",
    fontSize: hp('2%'),
    color: '#c94c4c'
  }
})

export default AboutUs