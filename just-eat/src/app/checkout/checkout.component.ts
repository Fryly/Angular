import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../shared/cart.service';
import { ProfileService } from '../shared/profile.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart = [];
  userData: any
  ordersForm: FormGroup
  errorMessage: string
  numberOrder = Math.floor(Math.random() * 100);

  id = localStorage.getItem('auth-token') === null 
       ? '' 
       : JSON.parse(localStorage.getItem('auth-token')).data._id
  helpMessage: boolean

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.cart = JSON.parse(sessionStorage.getItem('cart'))
    this.ordersForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      telefon: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      house: ['', Validators.required],
      floor: ['', Validators.required],
      entrance: ['', Validators.required],
      comment: ['', Validators.required],
      money: ['', Validators.required],
    })
    if(this.id){
      this.getUser();
    }
  }

  onSubmit() {
    if (this.ordersForm.get('telefon').value === '' && this.ordersForm.get('street').value === ''){
        this.errorMessage = 'Phone or address not entered'
    }else{
        this.cartService.checkout(
          this.ordersForm.get('name').value, 
          this.ordersForm.get('email').value,
          this.ordersForm.get('telefon').value,
          this.ordersForm.get('city').value,
          this.ordersForm.get('street').value,
          this.ordersForm.get('house').value,
          this.ordersForm.get('floor').value,
          this.ordersForm.get('entrance').value,
          this.ordersForm.get('comment').value,
          this.ordersForm.get('money').value,
          this.cart,
          this.id,
          this.numberOrder
        )
        .subscribe(
          data => {
            this.ordersForm.reset();
            this.cartService.clearToCart();
            this.cart = [];
            this.helpMessage = !this.helpMessage
          },
          err => {
            this.errorMessage = err.error;
          }
      );
    }
  }

  getUser() {
    this.profileService.getUser(this.id).subscribe((data) => {
      this.userData = data
      this.ordersForm = this.formBuilder.group({
        name: [this.userData.name, Validators.required],
        email: [this.userData.email, Validators.required],
        telefon: [this.userData.telefon, Validators.required],
        city: [this.userData.city, Validators.required],
        street: [this.userData.street, Validators.required],
        house: [this.userData.house, Validators.required],
        floor: ['', Validators.required],
        entrance: ['', Validators.required],
        comment: ['', Validators.required],
        money: ['', Validators.required],
      })
    }
    )
  }

  goBack(){
    this.helpMessage = !this.helpMessage
    window.location.href = '/main'
  }

}
