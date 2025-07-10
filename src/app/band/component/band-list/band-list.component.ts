import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-band-list',
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent implements OnInit {
    private apiUrl = environment.apiBaseUrl;
    bands: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.http.get<any[]>(`${this.apiUrl}/bands`).subscribe(data => this.bands = data);
     }
}
