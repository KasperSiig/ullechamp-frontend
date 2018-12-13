import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/User';
import {LeaderboardService} from '../shared/services/leaderboard.service';
import {TournamentService} from '../shared/services/tournament.service';
import {UserTournamentDTO} from '../shared/models/dtos/UserTournamentDTO';

@Component({
  selector: 'app-admin-tournament',
  templateUrl: './admin-tournament.component.html',
  styleUrls: ['./admin-tournament.component.css']
})
export class AdminTournamentComponent implements OnInit {

  queueUsers: User[];
  currentUsers: UserTournamentDTO[];

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
    return this.currentUsers.filter(u => u.team === team);
  }

  assignUserToTeam(event: MouseEvent, userId: number) {

    this.tourmanentService.assignTeams(<UserTournamentDTO>({
      team: event.srcElement.getAttribute('team'),
      user: this.queueUsers.filter(u => u.id === userId)
    }));
  }
}
