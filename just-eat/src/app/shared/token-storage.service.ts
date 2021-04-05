import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'  

const TOKEN_KEY = 'auth-token';


@Injectable({
  providedIn: 'root'
})


export class TokenStorageService {

  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token): void {
    let data = {
      data: jwt_decode(token.token),
      token: token.token
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
  }

  public getToken() {
    return JSON.parse(localStorage.getItem(TOKEN_KEY));
  }



}
