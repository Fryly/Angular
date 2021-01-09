import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  userUrl = 'http://localhost:3000/user/';
  urlOrders = 'http://localhost:3000/orders/';


  getUser(id: string) {
    return this.http.get(this.userUrl + `${id}`).pipe()
  }

  patchUser( name, email, telefon, id){
    let url = this.userUrl + 'change' + `/${id}`
    return this.http.patch( url,{
      email,
      name,
      telefon
    })
  }

  patchAddress( city, street, house, id ){
    let url = this.userUrl + 'adress' + `/${id}`
    return this.http.patch( url,{
      city,
      street,
      house
    })
  }

  patchStatus( status, number ){
    let url = this.urlOrders + 'status/' + `${number}`
    return this.http.patch( url,{
      status
    })
  }

  getHistoryOrders(id){
    return this.http.get(this.urlOrders + `${id}`).pipe()
  }

  getOrders(){
    return this.http.get(this.urlOrders).pipe()
  }
}
