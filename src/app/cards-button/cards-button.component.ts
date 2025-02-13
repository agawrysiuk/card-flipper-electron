import {Component, Input} from '@angular/core';
import {FlipCardData} from '../data/flip-cards-data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cards-button',
  standalone: false,
  templateUrl: './cards-button.component.html',
  styleUrl: './cards-button.component.scss'
})
export class CardsButtonComponent {

  @Input() title: string = 'TITLE';
  @Input() cards: FlipCardData[] = [];

  constructor(private router: Router) {}

  onLearnClick() {
    console.log('Learn button clicked');
  }

  onLearnWithPreviousClick() {
    console.log('Learn with previous button clicked');
  }

  onViewClick() {
    this.router.navigate(['/view-all'], { state: { cards: this.cards } });
  }
}
