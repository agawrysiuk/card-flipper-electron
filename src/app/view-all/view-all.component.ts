import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DayData} from '../data/dto';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {
  showFront = true;
  showBack = true;
  data!: DayData;

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.data = navigation.extras.state['data'];
    }
  }

  toggleColumn(column: 'front' | 'back') {
    if (column === 'front') {
      this.showFront = !this.showFront;
    } else {
      this.showBack = !this.showBack;
    }
  }

  goBack() {
    this.location.back()
  }
}
