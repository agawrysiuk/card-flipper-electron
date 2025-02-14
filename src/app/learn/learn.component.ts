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
  state: 'HIDE_BACK' | 'SHOW_BACK' | 'END' = 'HIDE_BACK';
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
      this.pickCard();
    }
  }

  showNextCard(newWeight: number) {
    this.adjustWeight(this.currentCard, newWeight);
    const allZeros = this.weightedCards.reduce((sum, wc) => sum + wc.weight, 0) === 0;
    if (allZeros) {
      this.state = 'END';
    } else {
      this.pickCard();
      this.toggleState();
    }
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
    this.state = this.state === 'HIDE_BACK' ? 'SHOW_BACK' : 'HIDE_BACK';
  }
}
