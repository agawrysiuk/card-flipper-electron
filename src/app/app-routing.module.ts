import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ViewAllComponent} from './view-all/view-all.component';
import {HomeComponent} from './home/home.component';
import {LearnComponent} from './learn/learn.component';

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
