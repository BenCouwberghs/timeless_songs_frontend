import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Genre } from '@model/genre';

@Injectable({
  providedIn: 'root'
})

export class GenreService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres`);
  }
}
