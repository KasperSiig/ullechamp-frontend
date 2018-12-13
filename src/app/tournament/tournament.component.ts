import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/User';
import {LeaderboardService} from '../shared/services/leaderboard.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  users: User[];

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit() {
    this.leaderboardService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.users.reverse();
      });
  }

}
