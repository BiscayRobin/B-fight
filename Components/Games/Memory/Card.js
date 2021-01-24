import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Game, images} from '../Game';

export default class Card extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let card_name = "interrogation_point.png";
		let card_source = images[card_name];
		if(this.props.is_open){
			card_name = this.props.name;
			card_source = images[card_name];
		}

		return (
			<View style={{ marginVertical:hp('1%'),marginHorizontal:wp('1%'),
      height:hp(this.hd),width:wp(this.wd), flex: 1, alignSelf: 'stretch', borderStyle:'solid',
      justifyContent:'center'}}>
				<TouchableOpacity onPress={this.props.clickCard} style={{backgroundColor:'#034f84' ,
				flex:1,justifyContent:'center',alignItems:'center'}}>
					<Image style={styles.image} source={card_source}/>
				</TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	image: {
    width: wp('5%'),
    height: wp('5%')
  }
});
