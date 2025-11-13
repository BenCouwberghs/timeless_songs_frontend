import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchVideosService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  search(bandName: string, songTitle: string): Observable<any[]> {
    const params = new HttpParams()
      .set('bandName', bandName)
      .set('songName', songTitle);

    return this.http.get<any[]>(`${this.apiUrl}/search-videos`, { params });
  }
}
