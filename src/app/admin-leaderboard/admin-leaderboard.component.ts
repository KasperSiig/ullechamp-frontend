import { Component, OnInit } from '@angular/core';
import {TournamentService} from '../shared/services/tournament.service';
import {PendingTournamentDTO} from '../shared/models/dtos/PendingTournamentDTO';
import {User} from '../shared/models/User';
import {TournamentDTO} from '../shared/models/dtos/TournamentDTO';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {GalleryService} from '../shared/services/gallery.service';

@Component({
  selector: 'app-admin-leaderboard',
  templateUrl: './admin-leaderboard.component.html',
  styleUrls: ['./admin-leaderboard.component.css']
})
export class AdminLeaderboardComponent implements OnInit {

  selectedFile: File;

  pending: PendingTournamentDTO;

  tournamentForm = new FormGroup({
    winner: new FormControl('')
  });

  constructor(private tourmanentService: TournamentService,
              private route: ActivatedRoute,
              private galleryService: GalleryService) { }

  ngOnInit() {
    // this.tourmanentService.getPendingById(+this.route.snapshot.paramMap.get('id'))
    //   .subscribe(pending => {
    //     this.pending = pending;
    //   });
    const pending1 = new PendingTournamentDTO();
    pending1.tournamentId = 1;

    const userDTO1 = new TournamentDTO();
    userDTO1.team = 0;
    userDTO1.user = new User();
    userDTO1.user.twitchname = 'Kasper1992';

    const userDTO3 = new TournamentDTO();
    userDTO3.team = 0;
    userDTO3.user = new User();
    userDTO3.user.twitchname = 'Jesper1992';

    const userDTO2 = new TournamentDTO();
    userDTO2.team = 1;
    userDTO2.user = new User();
    userDTO2.user.twitchname = 'Oliver1992';

    const userDTO4 = new TournamentDTO();
    userDTO4.team = 1;
    userDTO4.user = new User();
    userDTO4.user.twitchname = 'Tina1992';

    pending1.users = [userDTO1, userDTO2, userDTO3, userDTO4];
    this.pending = pending1;

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

  onSave() {
    this.galleryService.uploadPicture(this.selectedFile)
      .subscribe(() => {
      });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

}
