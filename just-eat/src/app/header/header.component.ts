import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('animationTriggerName', [
      transition('void => *', [
        style({ 
          transform: 'translateX(-100%)' 
        }),
        animate('0.5s', style({ 
          transform: 'translateX(0%)'
        })),
      ]),
      transition('* => void', [
        animate('0.5s', style({ 
          transform: 'translateX(-100%)'
        })),
      ]),
    ])
  ],
})
export class HeaderComponent implements OnInit{

  showSignIn: boolean
  showSignUp: boolean
  isLoggedIn: boolean
  showMmenu: boolean = false
  isAdmin = this.tokenStorageService.getToken() === null 
       ? false 
       : this.tokenStorageService.getToken().data.admin

  
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  getLen(){
      let store = sessionStorage.getItem('cart') === null 
      ? 0
      : JSON.parse(sessionStorage.getItem('cart')).length
      return store
  }

  getTotalPrice() {
    let dataPrice = JSON.parse(sessionStorage.getItem('cart'))
    let totalSum = dataPrice === null 
        ?  0 
        :  dataPrice.reduce((accumulator, currentValue) => {
          return (+currentValue.price * currentValue.count) + accumulator
        },0)
    return totalSum
  }

  showIn() {
    this.showSignIn = !this.showSignIn
    this.showMmenu = false
  }

  showUp() {
    this.showSignUp = !this.showSignUp
    this.showMmenu = false
  }
  

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
    window.location.href = '/main'
  }

  handleClick(event) {
    event.stopPropagation();
  }

  goMenu() {
    this.showMmenu = !this.showMmenu
  }

}
