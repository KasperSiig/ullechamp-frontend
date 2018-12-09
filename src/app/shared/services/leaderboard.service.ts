import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'leaderboard/');
  }

  search(search: string): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'leaderboard/search?search='
      + search);
  }
}
