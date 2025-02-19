import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LearnData} from '../../data/dto';

@Component({
  selector: 'app-cards-button',
  standalone: false,
  templateUrl: './cards-button.component.html',
  styleUrl: './cards-button.component.scss'
})
export class CardsButtonComponent {

  @Input() data!: LearnData;
  @Output() onViewClicked: EventEmitter<LearnData> = new EventEmitter<LearnData>();
  @Output() onLearnClicked: EventEmitter<LearnData> = new EventEmitter<LearnData>();
  @Output() onLearnWithPreviousClicked: EventEmitter<LearnData> = new EventEmitter<LearnData>();

  onLearnClick() {
    this.onLearnClicked.emit(this.data);
  }

  onLearnWithPreviousClick() {
    this.onLearnWithPreviousClicked.emit(this.data);
  }

  onViewClick() {
    this.onViewClicked.emit(this.data);
  }
}
