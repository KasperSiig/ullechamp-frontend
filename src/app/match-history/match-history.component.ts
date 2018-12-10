import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {
  constructor() { }

  imageSources: string[] = ['assets/imgs/rank1.png',
    'assets/imgs/rank2.png',
    'assets/imgs/rank3.png',
    'assets/imgs/rank4.png',
    'assets/imgs/rank5.png'];

  ngOnInit() {
  }

}
