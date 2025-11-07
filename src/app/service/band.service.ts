import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Band } from '@model/band';

@Injectable({
  providedIn: 'root'
})
export class BandService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  modifyBand(band: Band): Observable<string> {
    const bandDto = {
      id: band.id,
      name: band.name,
      linkWikiPage: band.linkWikiPage,
      comments: band.comments,
      pinned: band.pinned
    };
    return this.http.patch<string>(`${this.apiUrl}/bands/${band.id}`, bandDto, {responseType: 'text' as 'json'});
  }

  fetchBand(id: number): Observable<Band> {
    return this.http.get<Band>(`${this.apiUrl}/bands/${id}`);
  }

  fetchBands(): Observable<Band[]> {
    return this.http.get<Band[]>(`${this.apiUrl}/bands`);
  }

  saveBand(band: Band): Observable<string> {
    const bandDto = {
      name: band.name,
      linkWikiPage: band.linkWikiPage,
      comments: band.comments,
      pinned: band.pinned
    };
    return this.http.post<string>(`${this.apiUrl}/bands`, bandDto, {responseType: 'text' as 'json'});
  }

  deleteBand(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/bands/${id}`, {responseType: 'text' as 'json'});
  }

  search(keyword: string): Observable<Band[]> {
    return this.http.get<Band[]>(`${this.apiUrl}/bands/search/${keyword}`)
  }
}
