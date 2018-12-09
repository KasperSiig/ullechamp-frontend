import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/User';
import {LeaderboardService} from '../shared/services/leaderboard.service';
import {FormControl, FormGroup} from '@angular/forms';
import {map, window} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  windowHeight: number;

  selected = 0;

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

  constructor(private leaderboardService: LeaderboardService,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.leaderboardService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.users.reverse();
      });
  }

  onSearch() {
    this.leaderboardService.search(this.searchForm.get('search').value)
      .subscribe(users => {
        this.users = users;
      });
  }

}
