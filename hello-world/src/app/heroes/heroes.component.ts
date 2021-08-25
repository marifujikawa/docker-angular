import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Power } from '../interfaces/power';
import { PowerService } from '../power.service';
import { FormControl, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  powers: Power[] = [];
  selectedHero?: Hero;
  heroForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    heroPowers:
  })


  constructor(
    private heroService: HeroService,
    private powerService: PowerService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    $('.ui.search.dropdown').dropdown({});
    this.getHeroes();
    this.getPowers();
  }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  getPowers(): void {
    this.powerService.getPowers().subscribe((powers) => (this.powers = powers));
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`olha só id=${hero.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
