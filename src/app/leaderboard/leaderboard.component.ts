import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../shared/models/User';
import {LeaderboardService} from '../shared/services/leaderboard.service';
import {FormControl, FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {

  currentPage = 1;
  itemsPrPage: number;
  @ViewChild('scrollpane') scrollpane: ElementRef;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

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
    'Points'
  ];

  constructor(private leaderboardService: LeaderboardService,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const scrollpane = this.scrollpane.nativeElement as HTMLElement;
    this.itemsPrPage = Math.ceil(scrollpane.scrollHeight / 48);
    this.leaderboardService.getUsers(this.currentPage++, this.itemsPrPage)
      .subscribe(users => {
        this.users = users;
      });
  }

  onSearch() {
    this.currentPage = 1;
    this.leaderboardService
      .search(this.searchForm.get('search').value,
        this.currentPage++, this.itemsPrPage)
      .subscribe(users => {
        this.users = users;
      });
  }

  onSort() {
    this.currentPage = 1;
    this.leaderboardService.sort(this.currentPage++, this.itemsPrPage, this.options[this.selected])
      .subscribe(users => {
        this.users = users;
      });
  }

  onScroll(event: HTMLElement) {
    const atBottom = event.scrollHeight - event.scrollTop === event.clientHeight;
    if (!atBottom) { return; }
    this.leaderboardService.getUsers(this.currentPage++, this.itemsPrPage)
      .subscribe(users => {
        this.users.push(...users);
      });
  }

}
