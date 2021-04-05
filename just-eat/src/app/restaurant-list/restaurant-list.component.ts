import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../shared/restaurant.service';

const LISTTWO: string[] = [
  'Доставка', 'На вынос'
];

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) { }

  restaurant: any
  dataRestaurant: any
  dataFilterRestaurant: any
  dataDelivery: any
  awayDataDelivery: any
  listTwo: string[] = LISTTWO;
  activeRestaurant = 'Все';
  activeDelivery: string;
  activeKithen: string;
  time: any
  filterKithen = [];

  ngOnInit(): void {
    this.getRestaurants();
    this.getTime();
  }

  getRestaurants() {
    this.restaurantService.getRestaurant().subscribe((data) => {
      this.restaurant = data
      this.dataRestaurant = data
      this.dataDelivery = this.restaurant.filter(
        item => item.delivery && item.openTime <= this.time && item.closeTime >= this.time
      )
      this.awayDataDelivery = this.restaurant.filter(
        item => !item.delivery && item.openTime <= this.time && item.closeTime >= this.time
      )
      this.dataFilterRestaurant = this.restaurant.filter(
        item => item.openTime <= this.time && item.closeTime >= this.time
      )
      this.getKitchen()
    })
  }

  onSelectRestaurant(restaurants: string){
    this.activeRestaurant = restaurants;
    if(this.activeRestaurant === 'Все'){
      this.restaurant = this.dataRestaurant
      this.activeDelivery = ''
      this.activeKithen = ''
    }else{
      this.restaurant = this.dataFilterRestaurant
      this.activeDelivery = ''
      this.activeKithen = ''
    }
  }

  onSelectDelivery(delivery: string){
    this.activeDelivery = delivery;
    if(this.activeDelivery === 'Доставка'){
      this.restaurant = this.dataDelivery
      this.activeRestaurant = ''
      this.activeKithen = ''
    }else{
      this.restaurant = this.awayDataDelivery
      this.activeRestaurant = ''
      this.activeKithen = ''
    }
  }

  onSelectKithen(kitchen: string){
    this.activeKithen = kitchen
    this.restaurant = this.dataRestaurant
    this.activeDelivery = ''
    this.activeRestaurant = ''
    this.restaurant = this.restaurant.filter( item => 
      item.country.includes(kitchen)
    )
  }

  getTime(){
    let time = new Date().toLocaleTimeString().slice(0,-3);
    this.time = time
  }

  getKitchen(){
    this.restaurant.map( (item) => {  
          item.country.join(',').split(',').filter( (item) => {
            !this.filterKithen.includes(item) ? this.filterKithen.push(item) : null
          }
        )
      }
    )
  }
}