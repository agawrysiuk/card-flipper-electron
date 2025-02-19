import {Component} from '@angular/core';
import {FlipCard, LearnData} from '../../data/dto';
import {Router} from '@angular/router';
import {FlaggedCardSet, FlaggedCardsService} from '../../service/flagged-cards.service';

export interface WeightedFlipCard {
  weight: number;
  redCount: number;
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
  data!: LearnData;
  weightedCards: WeightedFlipCard[] = [];
  currentCard!: FlipCard;
  cardsLeft: number = 0;
  allCards: number = 0;
  words: number = 0;
  autoFlag!: boolean;
  flaggedCards: FlipCard[] = [];
  isInFlagged: boolean = false;

  constructor(private router: Router, private flaggedCardsService: FlaggedCardsService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.data = navigation.extras.state['data'];
      this.autoFlag = !this.data.isFlagged;
      this.weightedCards = this.data.cards
        .map(card => ({weight: 2, redCount: 0, card}));
      this.words = this.data.cards.length;
      this.allCards = this.weightedCards.length;
      this.flaggedCardsService.flagged.subscribe(res => this.flaggedCards = res);
      this.setCardsLeft();
      this.pickCard();
    } else {
      this.router.navigate(["home"]);
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
    if (newWeight === 5) {
      item.redCount++;
    }
    if (item.redCount === 3) {
      this.flaggedCardsService.addToFlagged(card, FlaggedCardSet.JAPANESE)
    }
    this.setCardsLeft();
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

    this.isInFlagged = this.flaggedCards.find(c => c.front === this.currentCard.front && c.back === this.currentCard.back) !== undefined;
  }

  toggleState() {
    this.state = this.state === 'HIDE_BACK' ? 'SHOW_BACK' : 'HIDE_BACK';
  }

  setCardsLeft() {
    this.cardsLeft = this.weightedCards.filter(wc => wc.weight > 0).length;
  }

  flagCard() {
    if (this.isInFlagged) {
      this.flaggedCardsService.removeFromFlagged(this.currentCard, FlaggedCardSet.JAPANESE);
      this.isInFlagged = false;
    } else {
      this.flaggedCardsService.addToFlagged(this.currentCard, FlaggedCardSet.JAPANESE);
      this.isInFlagged = true;
    }
  }
}
