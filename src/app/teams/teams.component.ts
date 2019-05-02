import {Component, OnDestroy, OnInit} from '@angular/core';
import {TournamentService} from '../shared/services/tournament.service';
import {TournamentDTO} from '../shared/models/dtos/TournamentDTO';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {

  currentUsers: TournamentDTO[];

  subscription: Subscription;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.subscription = this.tournamentService.current
      .subscribe(tournaments => {
        this.currentUsers = tournaments;
      });
    this.tournamentService.fetchCurrent();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterUsersOfTeam(team: number) {
    if (!this.currentUsers) { return []; }
    return this.currentUsers.filter(u => u.team === team);
  }
}
