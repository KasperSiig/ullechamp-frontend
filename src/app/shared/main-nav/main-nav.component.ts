import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit, OnDestroy {

  role: string;
  inhouseActive = false;
  adminActive = false;

  isLoggedIn: boolean;
  twitchname: string;

  subscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.subscription = this.authService.loggedIn
      .pipe(
        switchMap(isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
          return this.authService.getUsername();
        })
      ).pipe(
        switchMap(twitchname => {
          this.twitchname = twitchname;
          return this.authService.getRole();
        })
      ).subscribe(role => {
        this.role = role;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleInHouse() {
    this.inhouseActive = !this.inhouseActive;
  }

  toggleAdmin() {
    this.adminActive = !this.adminActive;
  }

  onLogout() {
    this.authService.logOut();
  }
}
