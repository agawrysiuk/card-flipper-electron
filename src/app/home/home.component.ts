import { Component } from '@angular/core';
import {FlipCardData, flipCardsData} from '../data/flip-cards-data';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  databaseCards: {day: string, data: FlipCardData[]}[] = [];

  constructor() {
    this.databaseCards = this.groupCardsByDay(flipCardsData);
  }

  private groupCardsByDay(cards: FlipCardData[]): {day: string, data: FlipCardData[]}[] {
    const grouped = cards.reduce((acc, card) => {
      const day = card.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(card);
      return acc;
    }, {} as {[key: string]: FlipCardData[]});

    return Object.keys(grouped).map(day => ({
      day,
      data: grouped[day]
    }));
  }
}
