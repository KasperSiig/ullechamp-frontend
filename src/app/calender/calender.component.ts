import { Component, OnInit } from '@angular/core';
import {CalenderItem} from '../shared/CalenderItem';
import {CalenderService} from '../shared/services/calender.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  calenderItems: CalenderItem[];

  constructor(private calenderService: CalenderService) { }

  ngOnInit() {
    this.calenderService.getItems()
      .subscribe(items => {
        this.calenderItems = items;
      });
  }

}
