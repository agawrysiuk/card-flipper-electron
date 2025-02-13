import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FlipCardData} from '../data/flip-cards-data';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {
  showJpn = true;
  showEng = true;
  cards: FlipCardData[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.cards = navigation.extras.state['cards'];
    }
  }

  toggleColumn(column: 'jpn' | 'eng') {
    if (column === 'jpn') {
      this.showJpn = !this.showJpn;
    } else {
      this.showEng = !this.showEng;
    }
  }
}
