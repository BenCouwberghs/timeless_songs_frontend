import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {FormsModule} from "@angular/forms";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-band-form',
  imports: [
  FormsModule,
    ],
  templateUrl: './new-band-form.component.html',
  styleUrl: './new-band-form.component.scss'
})
export class NewBandFormComponent {
  private apiUrl = environment.apiBaseUrl;
  name: string = '';
  linkWikiPage: string  = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSave() {
    this.saveBand(this.name, this.linkWikiPage).subscribe({
      next: () => this.router.navigate(['/band-list']),
      error: err => console.error('Error:', err)
      });
    }

  saveBand(name: string, linkWikiPage: string): Observable<string> {
    const bandDto = { name, linkWikiPage };
    return this.http.post<string>(`${this.apiUrl}/bands`, bandDto, {responseType: 'text' as 'json'});
    }
}
