import { Component, OnInit } from '@angular/core';
import { Power } from '../interfaces/power';
import { MessageService } from '../message.service';
import { PowerService } from '../power.service';
import { HeroService } from '../hero.service';
import { Hero } from '../interfaces/hero';
declare var $: any;

@Component({
  selector: 'app-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.scss'],
})
export class PowersComponent implements OnInit {
  private _powers: Power[] = [];
  heroes: Hero[] = [];
  selectedPower?: Power;

  public get powers(): Power[] {
    return this._powers;
  }

  constructor(
    private powerService: PowerService,
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    $('.ui.search.dropdown').dropdown({});
    this.getPowers();
    this.getHeroes();
  }
  getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  getPowers(): void {
    this.powerService
      .getPowers()
      .subscribe((powers) => (this._powers = powers));
  }
  onSelect(power: Power): void {
    this.selectedPower = power;
    this.messageService.add(`olha só id=${power.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.powerService.addPower({ name } as Power).subscribe((power) => {
      this.powers.push(power);
    });
  }
  deletePower(power: Power): void {
    this._powers = this.powers.filter((h) => h !== power);
    this.powerService.deletePower(power.id).subscribe();
  }
}
