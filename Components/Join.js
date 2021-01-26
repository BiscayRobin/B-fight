import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Join extends React.Component {

    constructor(props) {
        super(props);
        global.ws = new WebSocket('ws://127.0.0.1:5000');
        global.multiplayer = true;
        global.isPlaying = false;
        global.connected = true;
        global.score = 0;
        global.advScore = 0;
        this.beginGame = this.beginGame.bind(this);
        global.ws.onopen = () => {
            global.ws.send('lala');
            console.log('connected');
            global.connected=true;
        };
        global.ws.onmessage = (e) => {
            let mess = e.data.split(':');
            if(mess[0]=='begin'){
                global.isPlaying=true;
                console.log('begin');
                this.beginGame();
            }else if(mess[0]=='end'){
                global.advScore=parseInt(mess[1]);
                console.log(e.data);
                global.ws.send(`end:${global.score}`);
                global.isPlaying=false;
                global.ws.close('end');
                global.ws.connected=false;
            }else{
                console.log(`Unknown message: ${e.data}`);
            }
        };
        global.ws.onerror = (e) => {
            // an error occurred
            if(e.message==undefined){
                alert(`Error: Couldn't connect to server`);
            }else{
                alert(`An error has occured: ${e.message}`);
                global.ws.close('The opponent was disconnected');
            }
            global.connected=false;
        };
        global.ws.onclose = (e) => {
            // connection closed
            if(e.code==undefined){
                console.log(e.reason);
            }else if(e.reason==undefined){
                console.log(e.code);
            }else{
                console.log(e.code, e.reason);
            }
            global.connected=false;
        };
    }

    beginGame(){
        const { navigate } = this.props.navigation;
        let i = Math.floor(Math.random() * gameList.length);
        let game=gameList[i];
        navigate(game);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Waiting for an opponent</Text>
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

export default Join