import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { io } from 'socket.io-client';
import {Game,gameList} from './Games/Game';
import { Wave } from 'react-native-animated-spinkit'

const IP = '127.0.0.1';

class Join extends React.Component {

    constructor(props) {
        super(props);

        global.multiplayer = true;
        global.isPlaying = false;
        global.connected = false;
        global.score = 0;
        global.advScore = 0;
        this.beginGame = this.beginGame.bind(this);
        this.state = { visible: true };
        global.ws = io(`${IP}:5000`);
        global.ws.on("connect", ()=>{
            console.log('connected');
            global.connected=true;
        });

        global.ws.on("begin", ()=>{
            global.isPlaying=true;
            console.log('begin');
            this.beginGame();
        });

        global.ws.on("end", (msg)=>{
            console.log("reception du end");
            global.advScore=parseInt(msg);
            console.log(msg);
            global.ws.emit('end',`${global.score}`);
            global.isPlaying=false;
        });

        global.ws.on("bye", ()=>{
            const { navigate } = this.props.navigation;
            console.log("reception du bye");
            global.ws.close('end');
            global.ws.connected=false;
            navigate("EndGame");
        });

        global.ws.on("disconnect", (reason)=>{
            console.log(reason);
            global.connected=false;
        });

        global.ws.on("error", (reason)=>{
            const { navigate } = this.props.navigation;
            alert(`opponent had error ${reason}`);
            global.ws.close('end');
            global.ws.connected=false;
            global.connected=false;
            navigate("EndGame");
        });
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
                <Wave size={wp('15%')} color='#f7786b' ></Wave>
                <Text style={styles.title}>Waiting for an opponent...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#92a8d1',
        justifyContent:'center',
        alignItems:'center',

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
    image: {
        width: wp('10%'),
        height: wp('10%')
      }
})

export default Join
