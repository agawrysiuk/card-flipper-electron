import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sticky-button',
  standalone: false,
  templateUrl: './sticky-button.component.html',
  styleUrl: './sticky-button.component.scss'
})
export class StickyButtonComponent {

  @Input() left: number = 8;
  @Input() top: number = 8;
  @Input() right: number = 0;
  @Input() htmlSign: string = ' ';
  @Input() backgroundColor: string = '#f1f1f1';
  @Input() padding: string = '8px 16px';
  @Output() onButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

}
