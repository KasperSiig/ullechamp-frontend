import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('jwt', JSON.stringify({ token: token }));
  }

  getToken(): string {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    return jwt.token;
  }
}
