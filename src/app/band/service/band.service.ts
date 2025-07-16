import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

    modifyBand(name: string, linkWikiPage: string, id: number): Observable<string> {
        const bandDto = { id, name, linkWikiPage };
        return this.http.patch<string>(`${this.apiUrl}/bands/${id}`, bandDto, {responseType: 'text' as 'json'});
      }

    fetchBand(id: number): Observable<string> {
        return this.http.get<any>(`${this.apiUrl}/bands/${id}`)
      }

  }
