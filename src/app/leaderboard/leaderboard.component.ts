import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/User';
import {LeaderboardService} from '../shared/services/leaderboard.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  users: User[];

  options = [
    'Kills',
    'Wins',
    'Losses',
    'Deaths',
    'Assists',
    'KDA',
    'Win/Loss',
    'Points',
    'Rank'
  ];

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit() {
    this.leaderboardService.getUsers()
      .subscribe(users => {
        this.users = users;
    });
  }

  onSearch() {
    this.leaderboardService.search(this.searchForm.get('search').value, '1', '2')
      .subscribe(users => {
        this.users = users;
      });
  }

}
