import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/User';
import {LeaderboardService} from '../shared/services/leaderboard.service';
import {TournamentService} from '../shared/services/tournament.service';
import {TournamentDTO} from '../shared/models/dtos/TournamentDTO';

@Component({
  selector: 'app-admin-tournament',
  templateUrl: './admin-tournament.component.html',
  styleUrls: ['./admin-tournament.component.css']
})
export class AdminTournamentComponent implements OnInit {

  queueUsers: User[];
  currentUsers: TournamentDTO[];

  constructor(private tourmanentService: TournamentService) {
  }

  ngOnInit() {
    this.tourmanentService.getQueue()
      .subscribe(users => {
        this.queueUsers = users;
        this.queueUsers.reverse();
      });

    this.tourmanentService.getCurrent()
      .subscribe(users => {
        this.currentUsers = users;
      });
  }

  filterUsersOfTeam(team: number) {
    if (!this.currentUsers) { return []; }
    return this.currentUsers.filter(u => u.team === team);
  }

  assignUserToTeam(team: number, user: User) {

    this.tourmanentService.assignTeams(<TournamentDTO>({
      user: user,
      team: team
    })).subscribe();
    location.reload();
  }

  onEndMatch() {
    this.tourmanentService.endGame().subscribe();
  }
}
