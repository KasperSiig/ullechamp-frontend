import { Injectable } from '@angular/core';
import {CalenderItem} from '../CalenderItem';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  calenderItems: CalenderItem[];

  constructor() {
    this.calenderItems = [
      {id: 1, date: new Date(2018, 1, 20)},
      {id: 2, date: new Date(2010, 9, 12)},
      {id: 3, date: new Date(2000, 3, 14)},
      {id: 4, date: new Date(2017, 7, 23)},
      {id: 5, date: new Date(2013, 5, 1)}
    ];
  }

  getItems() {
    return this.calenderItems;
  }
}
