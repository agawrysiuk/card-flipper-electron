import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ViewAllComponent} from './views/view-all/view-all.component';
import {HomeComponent} from './views/home/home.component';
import {LearnComponent} from './views/learn/learn.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'view-all', component: ViewAllComponent },
  { path: 'learn', component: LearnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
