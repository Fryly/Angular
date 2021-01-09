import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  restaurantUrl = 'http://localhost:3000/restaurants/';

  getRestaurant() {
    return this.http.get(this.restaurantUrl).pipe()
  }

  getMenu(id: string) {
    return this.http.get(this.restaurantUrl + `${id}`).pipe()
  }

}
