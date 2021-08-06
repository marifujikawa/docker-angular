import { Injectable } from '@angular/core';
import { Hero } from './interfaces/hero';
import { HEROES } from './mock/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('Heróis realizando coisas de heróis');
    return heroes;
  }
  constructor(private messageService: MessageService) {}
}
