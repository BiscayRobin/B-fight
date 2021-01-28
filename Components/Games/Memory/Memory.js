import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Game, images} from '../Game';
import Card from './Card';

class Memory extends Game {
  // Constructor
  constructor(props) {
    super(props);
    this.name = "Memory";
    this.SCORE = 0;
    this.MAX_FAIL = 20;
    this.fail = 0;
    this.message = "";
    this.generateCards = this.generateCards.bind(this);
    this.resetCards = this.resetCards.bind(this);

    let cards = [
      {
        nameCard: "bird.png"
      },
      {
        nameCard: "cat.png"
      },
      {
        nameCard: "clown-fish.png"
      },
      {
        nameCard: "cocker-spaniel.png"
      },
      {
        nameCard: "elephant.png"
      },
      {
        nameCard: "fish.png"
      },
      {
        nameCard: "koala.png"
      },
      {
        nameCard: "mental-health.png"
      },
      {
        nameCard: "owl.png"
      },
      {
        nameCard: "shark.png"
      }
    ];

    let clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = images[obj.nameCard];
      obj.is_open = false;
    });

    this.shuffle(this.cards.length);
    this.state = {
      current_selection: [],
      selected_pairs: [],
      cards: this.cards
    }
  }

  // Function to shuffle the cards
  shuffle(n) {
    if(n == 0) {
      n = this.cards.length;
    }
    if(n > 1) {
      var i = Math.floor((n - 1)*Math.random());
      var tmp = this.cards[i];
      this.cards[i] = this.cards[n-1];
      this.cards[n-1] = tmp;
      this.shuffle(n-1);
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Find the cards that are the same !</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}> You have {this.MAX_FAIL} failures allowed. </Text>
        <Text style={styles.text}> Number of failures: {this.fail}. </Text>
        <Text style={styles.text}> {this.message} </Text>
        <Text style={styles.text}> Number of health points: {global.lives}. </Text>
      </View>
      <View style={{flex:1, alignSelf:'center', height: hp('90%'),width:wp('90%')}}>
        {this.generateRows.call(this)}
      </View>
      </View>
    )
  }

  // Function that is called when the game is lost
  gameLost(){
    alert('Wrong!');
    this.loseLives();
    this.resetCards();
    this.next();
  }

  // Function that is called when the game is won
  gameWon(){
    alert('Correct!');
    this.addToScore(this.SCORE);
    this.resetCards();
    this.next();
  }

  // Function to reset the cards
  resetCards() {
    let cards = this.cards.map((card) => {
      card.is_open = false;
      return card;
    });

    this.shuffle(cards.length);

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards
    });

    this.SCORE = 0;
    this.fail = 0;
    this.message = "";
  }

  // Function that creates the content of the lines
  getRowCards(cards) {
    let cardsRow = [];
    let cardsForARow = [];
    let count = 0;
    cards.forEach((card) => {
      count++;
      cardsForARow.push(card);
      if(count == 5) {
        cardsRow.push(cardsForARow)
        cardsForARow = [];
        count = 0;
      }
    });
    return cardsRow;
  }

  // Function that generates lines
  generateRows() {
    let rows = this.getRowCards(this.state.cards);
    return rows.map((cards) => {
      return (
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row'}}>
          {this.generateCards(cards)}
        </View>
      );
    });
  }

  // Function that generates the cards display
  generateCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          src={card.src}
          name={card.nameCard}
          is_open={card.is_open}
          game={this.game.bind(this, card.id)}
        />
      );
    });
  }

  // Function that defines the operation of the game
  game(id) {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    const messageWin = ["Well done !", "Awesome !", "Great !", "Perfectenschlag !", "Splendid !"];
    const messageLose = ["Lost !", "Too bad !", "Almost !", "You can do better !", "Missed !"];
    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;

    if(cards[index].is_open == false && selected_pairs.indexOf(cards[index].nameCard) === -1) { // when only one card is open
      cards[index].is_open = true;
      current_selection.push({
        index: index,
        name: cards[index].nameCard
      });

      if(current_selection.length == 2) { // when two cards are open
        if(current_selection[0].name == current_selection[1].name) { // when the two cards are identical
          selected_pairs.push(cards[index].nameCard);
          this.message = messageWin[Math.floor(Math.random() * messageWin.length)];
        } else {
          this.message = messageLose[Math.floor(Math.random() * messageLose.length)];
          this.fail++;
          cards[current_selection[0].index].is_open = false;
          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }
        current_selection = [];
      }

      this.setState({
        cards: cards,
        current_selection: current_selection
      });
    }
    if (selected_pairs.length == (this.cards.length/2)) { // Win
      this.SCORE += 500;
      this.gameWon();
    }
    if (this.fail == this.MAX_FAIL) { // Lose
      this.gameLost();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#92a8d1'
  },
  titleWrapper: {
    height: hp('10%'),
    width: wp('100%')
  },
  title: {
    textAlign: "center",
    fontSize: hp('5%'),
    color: '#f7786b'
  },
  textWrapper: {
    height: hp('10%'),
    width: wp('100%')
  },
  text: {
    textAlign: "center",
    fontSize: hp('2%'),
    color: '#c94c4c'
  }
})

export default Memory;
