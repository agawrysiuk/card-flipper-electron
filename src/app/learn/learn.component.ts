import {Component} from '@angular/core';
import {DayData, FlipCard} from '../data/dto';
import {Router} from '@angular/router';

export interface WeightedFlipCard {
  weight: number;
  card: FlipCard;
}

@Component({
  selector: 'app-learn',
  standalone: false,
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss'
})
export class LearnComponent {
  state = 1;
  data!: DayData;
  weightedCards: WeightedFlipCard[] = [];
  currentCard!: FlipCard;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.data = navigation.extras.state['data'];
      this.weightedCards = this.data.cards
        .flatMap(card => [
          card,
          { front: card.back, back: card.front }
        ])
        .map(card => ({weight: 3, card}));
      console.log(this.weightedCards)
      this.pickCard();
    }
  }

  showNextCard(newWeight: number) {
    console.log('showNextCard', newWeight);
    this.adjustWeight(this.currentCard, newWeight);
    this.pickCard();
    this.toggleState();
  }

  adjustWeight(card: FlipCard, newWeight: number) {
    const item = this.weightedCards.find(wc => wc.card === card)!;
    item.weight = newWeight;
  }

  pickCard() {
    const expandedList: FlipCard[] = [];

    for (const wc of this.weightedCards) {
      for (let i = 0; i < wc.weight; i++) {
        expandedList.push(wc.card);
      }
    }

    const randomIndex = Math.floor(Math.random() * expandedList.length);
    this.currentCard = expandedList[randomIndex];
  }


  toggleState() {
    this.state = this.state === 1 ? 2 : 1;
  }
}
