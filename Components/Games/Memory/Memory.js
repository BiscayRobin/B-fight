import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Game, images} from '../Game';
import Card from './Card';

class Memory extends Game {
  constructor(props) {
    super(props);
    this.name = "Memory";
    this.SCORE = 0;
    this.MAX_FAIL = 30;
    this.fail = 0;
    this.generateCards = this.generateCards.bind(this);
    this.resetCards = this.resetCards.bind(this);

    let cards = [
      {
        nameC: "bird.png"
      },
      {
        nameC: "cat.png"
      },
      {
        nameC: "clown-fish.png"
      },
      {
        nameC: "cocker-spaniel.png"
      },
      {
        nameC: "elephant.png"
      },
      {
        nameC: "fish.png"
      },
      {
        nameC: "koala.png"
      },
      {
        nameC: "mental-health.png"
      },
      {
        nameC: "owl.png"
      },
      {
        nameC: "shark.png"
      }
    ];

    let clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = images[obj.nameC];
      obj.is_open = false;
    });

    this.shuffle();
    this.state = {
      current_selection: [],
      selected_pairs: [],
      cards: this.cards
    }
  }

  shuffle() {
    var i = this.cards.length, j, temp;
    if(i == 0) return this.cards;
    while(--i){
     j = Math.floor(Math.random() * (i + 1));
     temp = this.cards[i];
     this.cards[i] = this.cards[j];
     this.cards[j] = temp;
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Find the cards that are the same.</Text>
      </View>
      <View style={{flex:1, alignSelf:'center', height: hp('90%'),width:wp('90%')}}>
        {this.generateRows.call(this)}
      </View>
      </View>
    )
  }

  gameLost(){
    alert('Wrong!');
    this.resetCards();
    this.next();
  }

  gameWon(){
    alert('Correct!');
    this.resetCards();
    this.addToScore(this.SCORE);
    this.next();
  }

  resetCards() {
    let cards = this.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });

    this.shuffle();

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards
    });
    this.SCORE = 0;
  }


  generateRows() {

    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row'}}>
          { this.generateCards(cards) }
        </View>
      );
    });

  }


  generateCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          src={card.src}
          name={card.nameC}
          is_open={card.is_open}
          clickCard={this.clickCard.bind(this, card.id)}
        />
      );
    });
  }


  clickCard(id) {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;

    if(cards[index].is_open == false && selected_pairs.indexOf(cards[index].nameC) === -1) {
      cards[index].is_open = true;
      current_selection.push({
        index: index,
        name: cards[index].nameC
      });

      if(current_selection.length == 2) {
        if(current_selection[0].name == current_selection[1].name) {
          selected_pairs.push(cards[index].nameC);
        } else {
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
    if (selected_pairs.length == (this.cards.length/2)) {
      this.SCORE += 500;
      this.gameWon();
    }
    if (this.fail == this.MAX_FAIL) {
      this.gameLost();
    }
  }

  getRowContents(cards) {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if(count == 4) {
        contents_r.push(contents)
        count = 0;
        contents = [];
      }
    });
    return contents_r;
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
  }
})

export default Memory;
