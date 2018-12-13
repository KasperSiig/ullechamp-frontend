import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/User';
import {LeaderboardService} from '../shared/services/leaderboard.service';

@Component({
  selector: 'app-admin-tournament',
  templateUrl: './admin-tournament.component.html',
  styleUrls: ['./admin-tournament.component.css']
})
export class AdminTournamentComponent implements OnInit {

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
