import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/User';

@Component({
  selector: 'app-trophy-room',
  templateUrl: './trophy-room.component.html',
  styleUrls: ['./trophy-room.component.css']
})
export class TrophyRoomComponent implements OnInit {

  users: User[];

  constructor() {}

  ngOnInit() {

  }
}
