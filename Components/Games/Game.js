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
        let game = [...gameList]
        if(this.name != undefined){
            let ind = game.indexOf(this.name);
            game.splice(ind,1);
        }
        let gameInd = Math.floor(Math.random() * game.length);
        let chosenGame=game[gameInd];
        navigate(chosenGame,{score:this.score});
    }
}

export default Game;
export const gameList = ["Calculation","AscendingOrder", "ColoredWords"];
