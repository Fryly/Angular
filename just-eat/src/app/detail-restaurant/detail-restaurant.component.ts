import { element } from 'protractor';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../shared/restaurant.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-detail-restaurant',
  templateUrl: './detail-restaurant.component.html',
  styleUrls: ['./detail-restaurant.component.css']
})
export class DetailRestaurantComponent implements OnInit {
  menuId: string;
  menuData: any;
  activeMenu: any
  
  constructor(
    private actRoute: ActivatedRoute,
    private restaurantService: RestaurantService, 
    private viewportScroller: ViewportScroller,
    private cartService: CartService,
    
    ) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.menuId = params.get('id');
    });
    this.getMenu();
  }

  getMenu() {
    this.restaurantService.getMenu(this.menuId).subscribe((data) => {this.menuData = data
    })
  }

  onClickMenu(elementId,menuItem){
    this.viewportScroller.scrollToAnchor(elementId)
    this.activeMenu = menuItem
  }

  addCart(item){
    if (window.confirm('Добавить в корзину?')){
      this.cartService.addToCartItem(item)
    }
  }

}
