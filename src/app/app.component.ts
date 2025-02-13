import { Component } from '@angular/core';
import {FlipCardData, flipCardsData} from './data/flip-cards-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  databaseCards: {weekDay: string, data: FlipCardData[]}[] = [];

  constructor() {
    this.databaseCards = this.groupCardsByWeek(flipCardsData);
  }

  private groupCardsByWeek(cards: FlipCardData[]): {weekDay: string, data: FlipCardData[]}[] {
    const grouped = cards.reduce((acc, card) => {
      const weekDay = `${card.week} ${card.day}`;
      if (!acc[weekDay]) {
        acc[weekDay] = [];
      }
      acc[weekDay].push(card);
      return acc;
    }, {} as {[key: string]: FlipCardData[]});

    return Object.keys(grouped).map(weekDay => ({
      weekDay,
      data: grouped[weekDay]
    }));
  }
}
