import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Power } from '../interfaces/power';
import { PowerService } from '../power.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  heroForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    heroPowers: this.fb.array([
      this.fb.control('heroId'),
      this.fb.control('powerId'),
    ]),
  });

  constructor(
    private heroService: HeroService,
    private powerService: PowerService,
    private messageService: MessageService,
    private fb: FormBuilder
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
    console.log(this.fb.array);

    return;
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
