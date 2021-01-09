import { map } from 'rxjs/operators';
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
  filterKithen: any;

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
    }else{
      this.restaurant = this.dataFilterRestaurant
      this.activeDelivery = ''
    }
  }

  onSelectDelivery(delivery: string){
    this.activeDelivery = delivery;
    if(this.activeDelivery === 'Доставка'){
      this.restaurant = this.dataDelivery
      this.activeRestaurant = ''
    }else{
      this.restaurant = this.awayDataDelivery
      this.activeRestaurant = ''
    }
  }

  onSelectKithen(kitchen: string){
    this.activeKithen = kitchen
  }

  getTime(){
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    this.time = hours + ':' + minutes
  }

  getKitchen(){
    let dataKitchen = [];
    let filterKithen =[];
    this.restaurant.map( item => dataKitchen.push(item.country));
    dataKitchen.join(',').split(',').map((item) => {
      if(!filterKithen.includes(item)){
        filterKithen.push(item)
      }
    })
    this.filterKithen = filterKithen
  }
}
