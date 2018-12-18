import { Component, OnInit } from '@angular/core';
import {TournamentService} from '../shared/services/tournament.service';
import {PendingTournamentDTO} from '../shared/models/dtos/PendingTournamentDTO';

@Component({
  selector: 'app-admin-tournaments',
  templateUrl: './admin-tournaments.component.html',
  styleUrls: ['./admin-tournaments.component.css']
})
export class AdminTournamentsComponent implements OnInit {

  tournaments: PendingTournamentDTO[] = [];

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.getPending()
      .subscribe(tournaments => {
        this.tournaments = tournaments;
      });
  }

}
