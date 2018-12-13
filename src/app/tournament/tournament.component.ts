import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/User';
import {LeaderboardService} from '../shared/services/leaderboard.service';
import {TournamentService} from '../shared/services/tournament.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  users: User[];

  constructor(private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.tournamentService.getQueue()
      .subscribe(users => {
        this.users = users;
        this.users.reverse();
      });
  }

  signUp() {
    this.tournamentService.signUp()
      .subscribe(() => {
        location.reload(true);
      });
  }

}
