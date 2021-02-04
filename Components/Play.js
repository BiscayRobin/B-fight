import React from 'react'
import {View, Text } from 'react-native'
import {Game,gameList} from './Games/Game'

class Play extends React.Component {

  componentDidMount() {
    const { navigate } = this.props.navigation;
    let i = Math.floor(Math.random() * gameList.length);
    let game=gameList[i];
    global.multiplayer=false;
    global.score = 0;
    navigate(game);
  }

  render() {  
    return (
      <View>
        <Text> Play </Text>
      </View>
    )
  }
}

export default Play
