import { Component, OnInit } from '@angular/core';
import { Power } from '../interfaces/power';
import { PowerService } from '../power.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-power-detail',
  templateUrl: './power-detail.component.html',
  styleUrls: ['./power-detail.component.scss'],
})
export class PowerDetailComponent implements OnInit {
  power: Power | undefined;

  constructor(
    private route: ActivatedRoute,
    private powerService: PowerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPower();
  }
  getPower(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.powerService.getPower(id).subscribe((power) => (this.power = power));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.power) {
      this.powerService.updatePower(this.power).subscribe(() => this.goBack());
    }
  }
}
