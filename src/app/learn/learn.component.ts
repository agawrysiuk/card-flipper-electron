import { Component } from '@angular/core';
import {DayData} from '../data/dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-learn',
  standalone: false,
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss'
})
export class LearnComponent {
  state = 1;
  text1 = 'Text 1';
  text2 = 'Text 2';

  data!: DayData;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.data = navigation.extras.state['data'];
    }
  }

  toggleState() {
    this.state = this.state === 1 ? 2 : 1;
  }

  logReaction(reaction: string) {
    console.log('User reaction:', reaction);
    this.state = 1;
  }
}
