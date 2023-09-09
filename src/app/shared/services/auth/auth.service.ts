import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router:Router) { }
  login(){
    this.router.navigate(['/']);
    localStorage.setItem('isLogged','true');
  }
  logout(){
    this.router.navigate(['/']);
    localStorage.removeItem('isLogged');
  }
  isLoggedIn(){
    return localStorage.getItem('isLogged');
  }
}
