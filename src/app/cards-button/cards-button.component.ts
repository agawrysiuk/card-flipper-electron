import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cards-button',
  standalone: false,
  templateUrl: './cards-button.component.html',
  styleUrl: './cards-button.component.scss'
})
export class CardsButtonComponent {

  @Input() title: string = 'TITLE';

  logClick(action: string) {
    console.log(`${action} button clicked`);
  }
}
