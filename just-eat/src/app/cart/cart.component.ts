import { CartService } from './../shared/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = []

  constructor(
    private cartService: CartService
  ) { }


  ngOnInit(): void {
    this.cart = JSON.parse(sessionStorage.getItem('cart'))
  }


  clearCart(){
    if (window.confirm('Вы действительно хотите очистить корзину?')){
      this.cartService.clearToCart()
      this.cart = [];
    }
  }

  deleteToCart(index){
    if (window.confirm('Вы действительно хотите удалить товар?')){
        this.cartService.deleteToCart(index)
        this.cart.splice(index, 1)
    }
  }

  increment(item){
    item.count++
    sessionStorage.setItem('cart', JSON.stringify(this.cart))
  }

  decrement(item){
    let dec = item.count === 1 ? item.count = 1 : item.count--
    sessionStorage.setItem('cart', JSON.stringify(this.cart))
    return dec
  }

}
