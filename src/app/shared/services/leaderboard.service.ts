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

  constructor(private http: HttpClient) {
  }

  getUsers(curPage: number, itemsPrPage: number): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'leaderboard/?currentpage='
      + curPage + '&itemsprpage=' + itemsPrPage);
  }

  search(search: string, curPage: number, itemsPrPage: number): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'leaderboard/search?search='
      + search + '&currentpage=' + curPage + '&itemsprpage=' + itemsPrPage);
  }

  sort(curPage: number, itemsPrPage: number, sorting: string): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'leaderboard/stats?curPage=' + curPage
      + '&itemsPrPage=' + itemsPrPage + '&sorting=' + sorting);
  }
}
