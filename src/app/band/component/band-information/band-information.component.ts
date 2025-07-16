import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {FormsModule} from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-band-information',
  imports: [CommonModule, FormsModule],
  templateUrl: './band-information.component.html',
  styleUrl: './band-information.component.scss'
})
export class BandInformationComponent implements OnInit {
    private apiUrl = environment.apiBaseUrl;
    band: any;
    showForm = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router : Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(`${this.apiUrl}/bands/${id}`).subscribe(res => this.band = res);
    }

  onSave() {
    this.modifyBand(this.band.name, this.band.linkWikiPage, this.band.id).subscribe({
          next: () => this.router.navigate(['/band-list']),
          error: err => console.error('Error:', err)
          });
    }

  modifyBand(name: string, linkWikiPage: string, id: number): Observable<string> {
      const bandDto = { id, name, linkWikiPage };
      return this.http.patch<string>(`${this.apiUrl}/bands/${id}`, bandDto, {responseType: 'text' as 'json'});
      }
}
