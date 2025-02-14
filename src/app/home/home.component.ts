import {Component} from '@angular/core';
import {japaneseData, JapaneseData} from '../data/japanese-data';
import {DayData} from '../data/dto';
import {Router} from '@angular/router';
import {ConverterService} from '../service/converter.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  databaseCards: DayData[] = [];

  constructor(private router: Router,
              private converter: ConverterService) {
    this.databaseCards = this.groupCardsByDay(japaneseData)
      .map(group => ({
        day: group.day,
        frontTitle: 'JPN',
        backTitle: 'ENG',
        cards: group.data.map(card => this.converter.toFlipCard(card))
      }));
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

  onViewClicked($event: DayData) {
    this.router.navigate(['/view-all'], {state: {data: $event}});
  }
}
