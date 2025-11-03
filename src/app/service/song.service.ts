import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Song } from '@model/song';

@Injectable({
  providedIn: 'root'
})

export class SongService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchSong(id: number): Observable<Song> {
      return this.http.get<Song>(`${this.apiUrl}/songs/${id}`);
  }

  fetchSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}/songs`);
  }

  saveSong(song: Song): Observable<string> {
    const songDto = {
        name: song.name,
        band: song.band,
        year: song.year,
        wikiLinkPage: song.wikiLinkPage,
        youTubeClipCode: song.youTubeClipCode
      };
    return this.http.post<string>(`${this.apiUrl}/songs`, songDto, {responseType: 'text' as 'json'});
  }

  modifySong(song: Song): Observable<string> {
    const songDto = {
      id: song.id,
      name: song.name,
      band: song.band,
      year: song.year,
      wikiLinkPage: song.wikiLinkPage,
      youTubeClipCode: song.youTubeClipCode
    };
    return this.http.patch<string>(`${this.apiUrl}/songs/${song.id}`, songDto, {responseType: 'text' as 'json'});
  }

  deleteSong(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/songs/${id}`, {responseType: 'text' as 'json'});
  }
}
