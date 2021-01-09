import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DetailRestaurantComponent } from './detail-restaurant/detail-restaurant.component';

import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: RestaurantListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'restaurant/:id', component: DetailRestaurantComponent },
  { path: 'profile', component: ProfileComponent  },
  { path: 'сheckout', component: CheckoutComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled'
  }),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
