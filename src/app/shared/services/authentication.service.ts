import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

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
    return jwt ? jwt.token : undefined;
  }

  isLoggedIn(): boolean {
    return !!JSON.parse(localStorage.getItem('jwt'));
  }

  getUsername(): string {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    let username: string;
    if (token) {
      const decoded = jwtHelper.decodeToken(token);
      username = decoded.twitchName;
    }
    console.log(username);
    return username;
  }

  logOut() {
    localStorage.removeItem('jwt');
  }
}
