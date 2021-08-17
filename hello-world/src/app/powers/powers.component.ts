import { Component, OnInit } from "@angular/core";
import { Power } from "../interfaces/power";
import { PowerService } from "../power.service";


@Component({
  selector: 'app-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.scss'],
})
export class PowersComponent implements OnInit {
  private _powers: Power[] = [];

  public get powers(): Power[] {
    return this._powers;
  }

  constructor(private powerService: PowerService) {}

  ngOnInit(): void {
    this.getPowers();
  }
  getPowers(): void {
    this.powerService
      .getPowers()
      .subscribe((powers) => (this._powers = powers));
  }
}
