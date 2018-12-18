import { Component, OnInit } from '@angular/core';
import {TournamentService} from '../shared/services/tournament.service';
import {PendingTournamentDTO} from '../shared/models/dtos/PendingTournamentDTO';
import {User} from '../shared/models/User';
import {TournamentDTO} from '../shared/models/dtos/TournamentDTO';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {GalleryService} from '../shared/services/gallery.service';
import {UserDTO} from '../shared/models/dtos/UserDTO';

@Component({
  selector: 'app-admin-leaderboard',
  templateUrl: './admin-leaderboard.component.html',
  styleUrls: ['./admin-leaderboard.component.css']
})
export class AdminLeaderboardComponent implements OnInit {

  selectedFile: File;

  pending: PendingTournamentDTO;

  tournamentId: number;

  tournamentForm = new FormGroup({
    winner: new FormControl('')
  });

  constructor(private tourmanentService: TournamentService,
              private route: ActivatedRoute,
              private galleryService: GalleryService) { }

  ngOnInit() {
    this.tournamentId = +this.route.snapshot.paramMap.get('id');
    this.tourmanentService.getPendingById(this.tournamentId)
      .subscribe(pending => {
        this.pending = pending;
      });

    this.pending.users.forEach((user) => {
      this.tournamentForm.addControl(user.user.twitchname + 'kills', new FormControl(''));
      this.tournamentForm.addControl(user.user.twitchname + 'deaths', new FormControl(''));
      this.tournamentForm.addControl(user.user.twitchname + 'assists', new FormControl(''));
    });
  }

  filterUsersOfTeam(team: number) {
    const users = this.pending.users.filter(u => u.team === team);
    return users;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSave() {
    this.galleryService.uploadPicture(this.selectedFile)
      .subscribe(() => {
      });

    const winnerTeam = +this.tournamentForm.get('winner').value;

    const winners = this.filterUsersOfTeam(winnerTeam);
    const losers = this.filterUsersOfTeam(+!winnerTeam);

    this.pending.users.forEach(userDTO => {
      const user = userDTO.user;
      user.kills = this.tournamentForm.get(user.twitchname + 'kills').value;
      user.deaths = this.tournamentForm.get(user.twitchname + 'deaths').value;
      user.assists = this.tournamentForm.get(user.twitchname + 'assists').value;
    });

    const winnersDTO = new UserDTO();
    winnersDTO.users.push(...winners.map(dto => dto.user));
    winnersDTO.tournamentId = this.tournamentId;

    const losersDTO = new UserDTO();
    losersDTO.users.push(...losers.map(dto => dto.user));
    losersDTO.tournamentId = this.tournamentId;
    this.tourmanentService.putWinners(winnersDTO).subscribe();
    this.tourmanentService.putLosers(losersDTO).subscribe();
  }

}
