import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  restaurantUrl = 'http://localhost:3000/restaurants/'

  getRestaurant(value): Observable<any[]> {
    const url = `${this.restaurantUrl}search/${value}`
    return this.http.get<any[]>(url).pipe();
  }

  addRestaurant(formData){
    const url = this.restaurantUrl + 'update'
    return this.http.post( url , formData);
  }

  changeRestaurant(name, country, food, openTime, closeTime, delivery, id) {
    const url = `${this.restaurantUrl}change/${id}`
    return this.http.put( url,{
      name,
      country,
      food,
      openTime,
      closeTime,
      delivery,
    })
  }

  changeImg(logo, id){
      const url = `${this.restaurantUrl}change/${id}`
      return this.http.patch(url, logo);
  }
}
