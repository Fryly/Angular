import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../model/hero';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', age: 28, sex: 'women' },
      { id: 12, name: 'Narco', age: 21, sex: 'men' },
      { id: 13, name: 'Ortoped', age: 23, sex: 'men' },
      { id: 14, name: 'Celeritas', age: 30, sex: 'men' },
      { id: 15, name: 'Magneta', age: 29, sex: 'women' },
      { id: 16, name: 'RubberMan', age: 26, sex: 'men' },
      { id: 17, name: 'Dynama', age: 25, sex: 'women' },
      { id: 18, name: 'Dr IQ', age: 24, sex: 'men' },
      { id: 19, name: 'Magma', age: 23, sex: 'women' },
      { id: 20, name: 'Tornado', age: 22, sex: 'women' },
    ];
    return {heroes};
  }
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}