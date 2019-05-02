import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../shared/models/User';
import {TournamentService} from '../shared/services/tournament.service';
import {TournamentDTO} from '../shared/models/dtos/TournamentDTO';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit, OnDestroy {

  queue: User[];

  role: string;

  subscription: Subscription;

  constructor(private tourmanentService: TournamentService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.subscription = this.authService.getRole()
      .pipe(
        switchMap(role => {
          this.role = role;
          return this.tourmanentService.queue;
        })
      ).subscribe(users => {
        this.queue = users;
      });
    this.tourmanentService.fetchQueue();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  assignUserToTeam(team: number, user: User) {

    this.tourmanentService.assignToTeam(<TournamentDTO>({
      user: user,
      team: team
    }));
  }

  isAdmin() {
    return this.role === 'Admin';
  }
}
