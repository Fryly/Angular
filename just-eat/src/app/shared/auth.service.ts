import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API = 'http://localhost:3000/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email, password) {
    return this.http.post(AUTH_API + 'login',{
      email,
      password
    },httpOptions)
  }

  register(email, password){
    return this.http.post(AUTH_API + 'register', {
      email,
      password
    }, httpOptions);
  }

}
