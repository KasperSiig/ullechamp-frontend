import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../shared/services/tournament.service';
import {PendingTournamentDTO} from '../shared/models/dtos/PendingTournamentDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {GalleryService} from '../shared/services/gallery.service';
import {TournamentDTO} from '../shared/models/dtos/TournamentDTO';

@Component({
  selector: 'app-admin-leaderboard',
  templateUrl: './admin-leaderboard.component.html',
  styleUrls: ['./admin-leaderboard.component.css']
})
export class AdminLeaderboardComponent implements OnInit {

  selectedFile: File;

  pending: PendingTournamentDTO = new PendingTournamentDTO();

  tournamentId: number;

  tournamentForm = new FormGroup({
    winner: new FormControl('')
  });

  constructor(private tourmanentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router,
              private galleryService: GalleryService) {
  }

  ngOnInit() {
    this.pending.users = [];
    this.tournamentId = +this.route.snapshot.paramMap.get('id');

    this.tourmanentService.getPendingById(this.tournamentId)
      .subscribe(pending => {
        this.pending = pending;
        this.pending.users.forEach((user) => {
          this.tournamentForm.addControl(user.user.twitchname + 'kills', new FormControl(''));
          this.tournamentForm.addControl(user.user.twitchname + 'deaths', new FormControl(''));
          this.tournamentForm.addControl(user.user.twitchname + 'assists', new FormControl(''));
        });
      });
  }

  filterUsersOfTeam(team: number) {
    return this.pending.users.filter(u => u.team === team);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSave() {
    this.galleryService.uploadPicture(this.selectedFile)
      .subscribe(() => {
      });

    const winnerTeam = +this.tournamentForm.get('winner').value;

    const users = this.pending.users.map(pending => {
      const user = pending.user;
      user.kills = +this.tournamentForm.get(user.twitchname + 'kills').value;
      user.deaths = +this.tournamentForm.get(user.twitchname + 'deaths').value;
      user.assists = +this.tournamentForm.get(user.twitchname + 'assists').value;

      const dto = new TournamentDTO();
      dto.user = user;
      dto.team = pending.team;
      delete dto.user['tournamentUsers'];
      dto.user.lolname = '';
      return dto;
    });

    this.tourmanentService.endTournament(users, winnerTeam)
      .subscribe(() => {
        this.router.navigateByUrl('/admin-tournaments');
      });
  }

}
