import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Separator = () => (
  <View style={styles.separator} />
);

class Menu extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
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
          <Button type="solid" raised="true" color='#034f84' title="      Options      " onPress={() => navigate('Options')}/>
          <Separator />
          <Button type="solid" raised="true" color='#034f84' title="     About us    " onPress={() => navigate('AboutUs')}/>
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
})

export default Menu
