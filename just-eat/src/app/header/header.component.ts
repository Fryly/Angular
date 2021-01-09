import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  showSignIn: boolean
  showSignUp: boolean
  isLoggedIn = false
  
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
    let totalSum = 0;
    if(dataPrice === null){
      return 0
    } 
    dataPrice.map(item => {
      totalSum += (+item.price * item.count)
    })
    return totalSum.toFixed(2)
  }

  showIn(): void {
    this.showSignIn = !this.showSignIn
  }

  showUp(): void {
    this.showSignUp = !this.showSignUp
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    window.location.href = '/main'
  }

}
