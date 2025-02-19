import {Component} from '@angular/core';
import {japaneseData, JapaneseData} from '../../data/japanese-data';
import {LearnData} from '../../data/dto';
import {Router} from '@angular/router';
import {ConverterService} from '../../service/converter.service';
import {FlaggedCardSet, FlaggedCardsService} from '../../service/flagged-cards.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  databaseCards: LearnData[] = [];

  constructor(private router: Router,
              private converter: ConverterService,
              private flaggedCardsService: FlaggedCardsService) {
    const flaggedCards = this.flaggedCardsService.getFlagged(FlaggedCardSet.JAPANESE)
    if (flaggedCards.length > 0) {
      this.databaseCards.push({
        cards: flaggedCards,
        frontTitle: 'Shown',
        backTitle: 'Not-Guessed',
        isFlagged: true,
        label: 'Flagged'
      })
    }
    this.databaseCards.push(...(this.groupCardsByDay(japaneseData)
      .map(group => ({
        label: group.day,
        frontTitle: 'JPN',
        backTitle: 'ENG',
        isFlagged: false,
        cards: group.data.map(card => this.converter.toFlipCard(card))
      }))));
  }

  private groupCardsByDay(cards: JapaneseData[]): { day: string, data: JapaneseData[] }[] {
    const grouped = cards.reduce((acc, card) => {
      const day = card.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(card);
      return acc;
    }, {} as { [key: string]: JapaneseData[] });

    return Object.keys(grouped).map(day => ({
      day,
      data: grouped[day]
    }));
  }

  onViewClicked($event: LearnData) {
    this.router.navigate(['/view-all'], {state: {data: $event}});
  }

  onLearnClicked($event: LearnData) {
    const doubled = $event.label !== 'Flagged'
    const learnData: LearnData = {
      ...$event,
      cards: doubled ? $event.cards
        .flatMap(card => [
          card,
          {front: card.back, back: card.front}
        ]) : $event.cards
    };
    this.router.navigate(['/learn'], {state: {data: learnData}});
  }

  onLearnWithPreviousClicked($event: LearnData) {
    const currentDayNumber = this.extractDay($event);
    const previousCards = this.databaseCards
      .filter(d => this.extractDay(d) < currentDayNumber)
      .flatMap(d => d.cards);

    const dataSum: LearnData = {
      label: $event.label + ' and previous',
      frontTitle: $event.frontTitle,
      backTitle: $event.backTitle,
      cards: $event.cards.concat(previousCards),
      isFlagged: false,
    }
    this.router.navigate(['/learn'], {state: {data: dataSum}});
  }

  extractDay(data: LearnData): number {
    const match = data.label.match(/\d+/)
    if (match) {
      return parseInt(match[0], 10);
    } else {
      return 10000;
    }
  }
}
