import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: false,
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back()
  }
}
