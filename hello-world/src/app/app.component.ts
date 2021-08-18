import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  /* Atributos */
  title: string = 'HEROS BE HEROS';
  activeRoute: string = 'home';

  /* Metodos */
  public setActiveRoute(value: string) {
    this.activeRoute = value;
  }
}
