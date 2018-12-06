import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/User';

@Component({
  selector: 'app-trophy-room',
  templateUrl: './trophy-room.component.html',
  styleUrls: ['./trophy-room.component.css']
})
export class TrophyRoomComponent implements OnInit {

  users: User[] = [{id: 1, username: 'MissTizz', role: 'Queen',
  wins: 99, losses: 0, kills: 83573422, deaths: 0, assists: 5,
  kda: 99.2, winLoss: 100, point: 999999, rank: 1},
  {id: 2, username: 'MissPizz', role: 'Queen',
    wins: 99, losses: 0, kills: 83573422, deaths: 0, assists: 5,
    kda: 99.2, winLoss: 100, point: 999999, rank: 2},
    {id: 3, username: 'MissFizz', role: 'Queen',
      wins: 99, losses: 0, kills: 83573422, deaths: 0, assists: 5,
      kda: 99.2, winLoss: 100, point: 999999, rank: 3},
    {id: 4, username: 'MissKizz', role: 'Queen',
      wins: 99, losses: 0, kills: 83573422, deaths: 0, assists: 5,
      kda: 99.2, winLoss: 100, point: 999999, rank: 4},
    {id: 5, username: 'MissLort', role: 'Queen',
      wins: 99, losses: 0, kills: 83573422, deaths: 0, assists: 5,
      kda: 99.2, winLoss: 100, point: 999999, rank: 5}];

  constructor() {}

  ngOnInit() {

  }
}