import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { PowersComponent } from './powers/powers.component';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { PowerDetailComponent } from './power-detail/power-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    PowersComponent,
    UpperCaseDirective,
    PowerDetailComponent,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
