import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  title = 'timeless_songs_frontend';

  private apiUrl = environment.apiBaseUrl;
  bands: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('Init');
    this.http.get<any[]>(`${this.apiUrl}/bands`).subscribe(data => this.bands = data);
   }
}
