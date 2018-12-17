import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from './authentication.service';
import {TournamentDTO} from '../models/dtos/TournamentDTO';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient,
              private auth: AuthenticationService) { }

  getCurrent(): Observable<TournamentDTO[]> {
    return this.http.get<TournamentDTO[]>(environment.apiUrl + 'tournament/current');
  }

  getQueue(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'tournament/queue');
  }

  signUp(): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'tournament/queue', {jwt: this.auth.getToken()});
  }

  assignTeams(dto: TournamentDTO): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'tournament/current', {user: dto.user, team: dto.team});
  }
}
