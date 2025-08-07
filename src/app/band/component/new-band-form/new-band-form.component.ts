import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { BandService } from '../../service/band.service';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from '../../../service/notification.service'

@Component({
  selector: 'app-new-band-form',
  imports: [
  FormsModule, InputTextModule, FluidModule, ToastModule, ButtonModule
    ],
  providers: [],
  templateUrl: './new-band-form.component.html',
  styleUrl: './new-band-form.component.scss'
})
export class NewBandFormComponent {
  name: string = '';
  linkWikiPage: string  = '';

  constructor(private router: Router, private bandService: BandService, private notificationService: NotificationService ) {}

  onSave() {
    if(this.name == '') {
      this.notificationService.sendError('Band name cannot be empty.');
      return;
      }

    this.bandService.saveBand(this.name, this.linkWikiPage).subscribe({
      next: () => {
        this.notificationService.sendSuccess(`Band ${this.name} has been added`);
        this.router.navigate(['/band-list']);
        },
      error: err => {
        console.error('Error:', err);
        this.notificationService.sendError(`Error: ${err.message}`);
        }
      });
    }

  onCancel() {
    this.router.navigate(['/band-list']);
  }
}
