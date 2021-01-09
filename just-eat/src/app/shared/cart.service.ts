import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

const ORDERS_API = 'http://localhost:3000/orders';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = [];
  userUrl = 'http://localhost:3000/user/'
  constructor( private http: HttpClient) { }



  addToCartItem(item){
    item.count = 1
    this.items.push(item)
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

  clearToCart(){
    sessionStorage.clear()
    this.items = []
  }

  deleteToCart(index){
    this.items =  JSON.parse(sessionStorage.getItem('cart'))
    this.items.splice(index,1)
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

  checkout(name, email, telefon, city, 
           street, house, floor, entrance, 
           comment, money, cart, id, numberOrder){

    return this.http.post(ORDERS_API, {
        name,
        email,
        telefon,
        address: city + ',ул.' + street + ',дом ' + house + ',этаж ' + floor + ',подъезд ' + entrance,
        comment,
        payment: money,
        cart,
        id,
        orderid: numberOrder
    });
  }

}
