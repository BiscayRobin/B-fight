import React from 'react'

class Game extends React.Component {

    constructor(props){
        super(props);
        if(props.route.score == undefined){
            this.score=0;
        }else{
            this.score=props.route.score;
        }
        console.log(this.score);
    }

    addToScore(score){
        this.score+=score;
    }

    next(){
        const { navigate } = this.props.navigation;
        let game = Math.floor(Math.random() * gameList.length);
        game=gameList[game];
        navigate(game,{score:this.score});            
    }
}

export default Game;
export const gameList = ["Calculation","AscendingOrder"];