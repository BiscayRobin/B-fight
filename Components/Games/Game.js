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
        let game = [...gameList];
        if(this.name != undefined){
            let ind = game.indexOf(this.name);
            game.splice(ind,1);
        }
        let gameInd = Math.floor(Math.random() * game.length);
        let chosenGame=game[gameInd];
        navigate(chosenGame,{score:this.score});
    }
}

const gameList = ["Calculation","AscendingOrder", "ColoredWords","Symbols", "Memory"];
//const images = ["./images/bird.png","./images/cat.png","./images/clown-fish.png","./images/cocker-spaniel.png","./images/elephant.png","./images/fish.png","./images/koala.png","./images/owl.png","./images/shark.png","./images/mental-health.png"];
const images= {
    "bird.png":require("./images/bird.png"),
    "cat.png":require('./images/cat.png'),
    "clown-fish.png":require("./images/clown-fish.png"),
    "cocker-spaniel.png":require("./images/cocker-spaniel.png"),
    "elephant.png":require("./images/elephant.png"),
    "fish.png":require("./images/fish.png"),
    "koala.png":require("./images/koala.png"),
    "owl.png":require("./images/owl.png"),
    "shark.png":require("./images/shark.png"),
    "mental-health.png":require("./images/mental-health.png"),
    "interrogation_point.png":require("./images/interrogation_point.png")
};

export {Game, gameList, images,};
