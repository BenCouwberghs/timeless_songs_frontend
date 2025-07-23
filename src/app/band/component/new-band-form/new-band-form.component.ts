import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { BandService } from '../../service/band.service';

@Component({
  selector: 'app-new-band-form',
  imports: [
  FormsModule
    ],
  templateUrl: './new-band-form.component.html',
  styleUrl: './new-band-form.component.scss'
})
export class NewBandFormComponent {
  name: string = '';
  linkWikiPage: string  = '';

  constructor(private router: Router, private bandService: BandService ) {}

  onSave() {
    if(this.name == '') {
      alert('Band name cannot be empty.');
      return;
      }

    this.bandService.saveBand(this.name, this.linkWikiPage).subscribe({
      next: () => this.router.navigate(['/band-list']),
      error: err => {
        console.error('Error:', err);
        alert('Error: ' + err);
        }
      });
    }
}
