import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, map } from 'rxjs';

import { Song } from '@model/song';

@Injectable({
  providedIn: 'root'
})

export class SongService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchSong(id: number): Observable<Song> {
    return this.http.get<Song>(`/api/songs/${id}`).pipe(
      map(song => this.mapGenres(song))
    );
  }

  fetchSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}/songs`).pipe(
      map(songs => songs.map(song => this.mapGenres(song)))
    );
  }

  mapGenres(song: Song): Song {
    return {
      ...song,
      genres: song.genres
        ? (song.genres as unknown as string).split(',').map(g => Number(g.trim()))
        : []
    };
  }

  saveSong(song: Song): Observable<string> {
    const songDto = {
        name: song.name,
        band: song.band,
        year: song.year,
        wikiLinkPage: song.wikiLinkPage,
        youTubeClipCode: song.youTubeClipCode,
        genres: song.genres.join(','),
        rating: song.rating
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
      youTubeClipCode: song.youTubeClipCode,
      genres: song.genres.join(','),
      rating: song.rating
    };
    return this.http.patch<string>(`${this.apiUrl}/songs/${song.id}`, songDto, {responseType: 'text' as 'json'});
  }

  deleteSong(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/songs/${id}`, {responseType: 'text' as 'json'});
  }
}
