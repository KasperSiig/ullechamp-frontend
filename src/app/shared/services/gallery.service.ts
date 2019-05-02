import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) {
  }

  uploadPicture(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post<any>(environment.apiUrl + 'gallery', uploadData);
  }
}
