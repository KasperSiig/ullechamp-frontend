import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient,
              private auth: AuthenticationService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'leaderboard/');
  }

  search(search: string, curPage: string, itemsPrPage: string): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'leaderboard/search?search='
      + search + '&currentpage=' + curPage + '&itemsprpage=' + itemsPrPage);
  }

  sort(curPage: string, itemsPrPage: string, sorting: string): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'leaderboard/stats?curPage=' + curPage
      + '&itemsPrPage=' + itemsPrPage + '&sorting=' + sorting);
  }
}
