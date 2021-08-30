import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Power } from '../interfaces/power';
import { PowerService } from '../power.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import HeroPowers from '../interfaces/hero-powers';
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
    powers: [[], Validators.required],
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
    console.log(this.heroForm.value);

    name = name.trim();
    if (!name) {
      return;
    }
    let heroPowers = this.heroForm.value as HeroPowers;
    this.heroService.addHero(heroPowers).subscribe((hero) => {
      //this.heroes.push(heroPowers.hero);
      this.getHeroes();
      this.heroForm.value;
      this.resetForm();
    });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  get powersForm() {
    return this.heroForm.get('powers') as FormArray;
  }
  resetForm() {
    this.heroForm.reset();
    this.powersForm.setValue([]);
    $('.ui.search.dropdown').dropdown('clear');
  }
}
