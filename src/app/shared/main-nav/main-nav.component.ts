import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit{

  inhouseActive = false;
  adminActive = false;

  isLoggedIn: boolean;
  username: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthenticationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
    }
  }

  toggleInHouse() {
    this.inhouseActive = !this.inhouseActive;
  }

  toggleAdmin() {
    this.adminActive = !this.adminActive;
  }

  onLogout() {
    this.authService.logOut();
    location.reload();
  }
}
