import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { BandService } from '../../service/band.service';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-new-band-form',
  imports: [
  FormsModule, InputTextModule, FluidModule,
    ],
  templateUrl: './new-band-form.component.html',
  styleUrl: './new-band-form.component.scss'
})
export class NewBandFormComponent {
  name: string = '';
  linkWikiPage: string  = '';

  constructor(private router: Router, private bandService: BandService ) {}

  onSave() {
    this.bandService.saveBand(this.name, this.linkWikiPage).subscribe({
      next: () => this.router.navigate(['/band-list']),
      error: err => console.error('Error:', err)
      });
    }

  onCancel() {
    this.router.navigate(['/band-list']);
  }
}
