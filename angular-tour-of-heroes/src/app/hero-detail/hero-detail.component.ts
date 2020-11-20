import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../model/hero';
import { HeroService } from '../service/hero.service';
import { HEROES } from '../util/mock-heroes';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  dataSource = new MatTableDataSource<Hero>(HEROES);

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {this.hero = hero; console.log(this.hero)});
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  delete(hero: Hero): void {
    this.dataSource.data = this.dataSource.data.filter(h => h.id !== hero.id);
    this.heroService.deleteHero(hero).subscribe(() => this.goBack());
  }

}
