import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-band-form',
  imports: [
  FormsModule,
    ],
  templateUrl: './new-band-form.component.html',
  styleUrl: './new-band-form.component.scss'
})
export class NewBandFormComponent {
  private baseUrl = 'http://localhost:8080/api';
  name: string = '';
  linkWikiPage: string  = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSave() {
    this.saveBand(this.name, this.linkWikiPage)
    this.router.navigate(['/band-list']);
    }

  saveBand(name: string, linkWikiPage: string): Observable<string> {
    const bandDto = { name, linkWikiPage };
    return this.http.post<string>(`${this.baseUrl}/bands`, bandDto, {responseType: 'text' as 'json'});
    }
}
