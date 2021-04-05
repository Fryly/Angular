import { RestaurantService } from './shared/restaurant.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PopUpSignInComponent } from './pop-up-sign-in/pop-up-sign-in.component';
import { PopUpSignUpComponent } from './pop-up-sign-up/pop-up-sign-up.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { DetailRestaurantComponent } from './detail-restaurant/detail-restaurant.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopUpSignInComponent,
    PopUpSignUpComponent,
    RestaurantListComponent,
    CartComponent,
    DetailRestaurantComponent,
    ProfileComponent,
    CheckoutComponent,
    AdminComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
