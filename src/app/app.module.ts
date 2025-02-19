import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsButtonComponent } from './components/cards-button/cards-button.component';
import { ViewAllComponent } from './views/view-all/view-all.component';
import { HomeComponent } from './views/home/home.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { LearnComponent } from './views/learn/learn.component';
import { StickyButtonComponent } from './components/sticky-button/sticky-button.component';
import { FavouriteButtonComponent } from './components/favourite-button/favourite-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsButtonComponent,
    ViewAllComponent,
    HomeComponent,
    BackButtonComponent,
    LearnComponent,
    StickyButtonComponent,
    FavouriteButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
