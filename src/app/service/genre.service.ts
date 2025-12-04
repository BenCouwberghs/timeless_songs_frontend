import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from '@service/cache.service';

import { Genre } from '@model/genre';

@Injectable({
  providedIn: 'root'
})

export class GenreService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  fetchGenres(): Observable<Genre[]> {
    const cached = this.cacheService.get('genres');
    if (cached) {
      return of(cached);
    }

    return this.http.get<Genre[]>(`${this.apiUrl}/genres`).pipe(
      tap(data => this.cacheService.set('genres', data))
    );
  }

  clearCachedGenres() {
    this.cacheService.clear('genres');
  }
}
