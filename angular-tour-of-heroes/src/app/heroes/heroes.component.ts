import { HEROES } from './../util/mock-heroes';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Hero } from './../model/hero';
import { HeroService } from '../service/hero.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];
  displayedColumns: string[] = ['id', 'name', 'age', 'sex'];
  dataSource = HEROES;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    console.log(HEROES,'ss')
  }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => {this.heroes = heroes 
          console.log(heroes)});

  }
  add(name: string, age: number, sex: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name, age, sex } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        console.log(hero)
      });
      console.log(name, age, sex)
  }
  
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
