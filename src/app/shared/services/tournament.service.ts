import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient,
              private auth: AuthenticationService) { }

  getCurrent(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'tournament/current');
  }

  getQueue(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'tournament/queue');
  }

  signUp(): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'tournament/queue', {jwt: this.auth.getToken()});
  }
}
