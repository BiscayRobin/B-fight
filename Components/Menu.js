import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Menu extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.title}> B-FIGHT </Text>
        <Button type="solid" raised="true" color='#034f84' title="Single Player" onPress={() => {}}/>
        <Button type="solid" raised="true" color='#034f84' title="Multi Player" onPress={() => {}}/>
        <Button type="solid" raised="true" color='#034f84' title="Options" onPress={() => {}}/>
        <Button type="solid" raised="true" color='#034f84' title="About us" onPress={() => {}}/>
        <Text style={styles.version}> Version 1.0 </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#92a8d1'
  },
  title: {
    textAlign: "center"
  },
  version: {
    textAlign: "center"
  }
})

export default Menu
