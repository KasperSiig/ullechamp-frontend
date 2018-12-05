import { Injectable } from '@angular/core';
import {CalenderItem} from '../CalenderItem';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {


  constructor(private http: HttpClient) { }

  getItems(): Observable<CalenderItem[]> {
    return this.http.get<CalenderItem[]>(environment.apiUrl + 'calenderitems/');
  }
}
