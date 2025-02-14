import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: false,
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

  @Input() left: number = 8;
  @Input() top: number = 8;

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back()
  }
}
