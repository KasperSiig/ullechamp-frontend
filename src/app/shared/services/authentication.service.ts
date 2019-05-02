import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('jwt', JSON.stringify({ token: token }));
    this.loggedIn.next(!!token);
  }

  getToken(): string {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    return jwt ? jwt.token : undefined;
  }

  isLoggedIn(): boolean {
    return !!JSON.parse(localStorage.getItem('jwt'));
  }

  getUsername(): Observable<string> {
    return Observable.create(obs => {
      const token = this.getDecodedToken();
      let username: string;
      if (token)
        username = token.twitchName;

      obs.next(username);
    });
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.loggedIn.next(undefined);
  }

  isAuthenticated(): Observable<boolean> {
    return Observable.create(obs => {
      obs.next(this.getToken());
    });
  }

  getRole(): Observable<string> {
    return Observable.create(obs => {
      const token = this.getDecodedToken();
      let role;
      if (token)
        role = token.role;

      obs.next(role);
    });
  }

  getDecodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    let decoded;

    if (token)
      decoded = jwtHelper.decodeToken(token);

    return decoded;
  }
}
