import {Component, OnDestroy, OnInit} from '@angular/core';
import {TournamentService} from '../shared/services/tournament.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit, OnDestroy {

  role: string;

  subscription: Subscription;

  constructor(private tournamentService: TournamentService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.subscription = this.authService.getRole()
      .subscribe(role => {
        this.role = role;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signUp() {
    this.tournamentService.signUp()
      .subscribe(() => {
        location.reload(true);
      });
  }

  onSave() {
    this.tournamentService.assignTeams()
      .subscribe();
  }

  isAdmin() {
    return this.role === 'Admin';
  }

  onEndMatch() {
    this.tournamentService.endMatch()
      .subscribe();
  }

}
