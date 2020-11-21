import { HEROES } from './../util/mock-heroes';

import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Hero } from './../model/hero';
import { HeroService } from '../service/hero.service';





@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit,AfterViewInit {

  name: string;
  age: number;
  sex: string;

  dataLoading: boolean = false 
  displayedColumns: string[] = ['id', 'name', 'age', 'sex'];
  dataSource = new MatTableDataSource<Hero>(HEROES);

  constructor(
    private heroService: HeroService,
    ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => {
          this.dataSource.data = heroes
        });
  }
  add(): void {
    this.heroService.addHero({ name: this.name , age: this.age , sex: this.sex } as Hero)
      .subscribe(hero => {
        this.dataSource.data.push(hero);
        this.name = '';
        this.age = null;
        this.sex = '';
        this.getHeroes()
      });
  }
  
}
