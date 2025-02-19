import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LearnData} from '../../data/dto';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {
  showFront = true;
  showBack = true;
  data!: LearnData;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.data = navigation.extras.state['data'];
    } else {
      this.router.navigate(["home"]);
    }
  }

  toggleColumn(column: 'front' | 'back') {
    if (column === 'front') {
      this.showFront = !this.showFront;
    } else {
      this.showBack = !this.showBack;
    }
  }
}
