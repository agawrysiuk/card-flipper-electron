import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-favourite-button',
  standalone: false,
  templateUrl: './favourite-button.component.html',
  styleUrl: './favourite-button.component.scss'
})
export class FavouriteButtonComponent {

  @Input() fullFlag = false;
  @Output() onFavouriteClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
}
