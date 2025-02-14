import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsButtonComponent } from './cards-button/cards-button.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { HomeComponent } from './home/home.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { LearnComponent } from './learn/learn.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsButtonComponent,
    ViewAllComponent,
    HomeComponent,
    BackButtonComponent,
    LearnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
