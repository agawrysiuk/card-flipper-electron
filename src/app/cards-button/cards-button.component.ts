import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DayData} from '../data/dto';

@Component({
  selector: 'app-cards-button',
  standalone: false,
  templateUrl: './cards-button.component.html',
  styleUrl: './cards-button.component.scss'
})
export class CardsButtonComponent {

  @Input() data!: DayData;
  @Output() onViewClicked: EventEmitter<DayData> = new EventEmitter<DayData>();

  onLearnClick() {
    console.log('Learn button clicked');
  }

  onLearnWithPreviousClick() {
    console.log('Learn with previous button clicked');
  }

  onViewClick() {
    this.onViewClicked.emit(this.data);
  }
}
