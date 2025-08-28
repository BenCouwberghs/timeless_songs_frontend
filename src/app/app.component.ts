import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, RouterLink, ButtonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  title = 'timeless_songs_frontend';

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('Init');
   }
}
