import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SongService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchSong(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/songs/${id}`);
  }

  fetchSongs(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/songs`);
  }

  saveSong(name: string, band: any, year: number, wikiLinkPage: string): Observable<string> {
    const songDto = { name, band, year, wikiLinkPage };
    return this.http.post<string>(`${this.apiUrl}/songs`, songDto, {responseType: 'text' as 'json'});
  }

}
