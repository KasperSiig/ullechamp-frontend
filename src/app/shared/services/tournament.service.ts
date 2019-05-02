import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../models/User';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from './authentication.service';
import {TournamentDTO} from '../models/dtos/TournamentDTO';
import {PendingTournamentDTO} from '../models/dtos/PendingTournamentDTO';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  current = new BehaviorSubject<TournamentDTO[]>([]);
  queue = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient,
              private auth: AuthenticationService) {
  }

  fetchCurrent() {
    this.http.get<TournamentDTO[]>(environment.apiUrl + 'tournament/current')
      .subscribe(tournaments => {
        this.current.next(tournaments);
      });
  }

  assignToTeam(user: TournamentDTO) {
    this.current.next([...this.current.getValue(), user]);
    this.removeFromQueue(user.user);
  }

  fetchQueue() {
    this.http.get<User[]>(environment.apiUrl + 'tournament/queue')
      .subscribe(users => {
        this.queue.next(users);
      });
  }

  signUp(): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + 'tournament/queue',
        {jwt: this.auth.getToken()});
  }

  assignTeams(): Observable<any> {
    return this.http.put<any>(environment.apiUrl + 'tournament/current', this.current.value);
  }

  getPending(): Observable<PendingTournamentDTO[]> {
    return this.http.get<PendingTournamentDTO[]>(environment.apiUrl + 'tournament/pending');
  }

  getPendingById(id: number): Observable<PendingTournamentDTO> {
    return this.http.get<PendingTournamentDTO>(environment.apiUrl + 'tournament/pending/' + id);
  }

  endTournament(users: TournamentDTO[], team: number): Observable<any> {
    console.log(users);
    return this.http.put<any>(environment.apiUrl + 'tournament/end?team=' + team, users);
  }

  endMatch(): Observable<any> {
    return this.http.put<any>(environment.apiUrl + 'tournament/endgame', {});
  }

  private removeFromQueue(user: User) {
    const index = this.queue.value.indexOf(user);
    this.queue.value.splice(index, 1);
    this.queue.next(this.queue.value);
  }
}
