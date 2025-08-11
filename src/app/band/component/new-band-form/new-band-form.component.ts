import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  band: any;
  update = false;
  id: any;

  constructor(private route: ActivatedRoute, private router: Router, private bandService: BandService, private notificationService: NotificationService ) {}

// Have init check if we get an id variable passed, if so execute code to show the update side
// Otherwise we know we need to show the add band side

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id == null) {
      // Execute add side
      // Place code to show the appropriate form and buttons
      } else {
        // Execute update side
        this.update = true;
        this.bandService.fetchBand(this.id).subscribe(res => {
          this.band = res;
          this.name = this.band.name;
          this.linkWikiPage = this.band.linkWikiPage;
          });
        }
        // Place code to show the appropriate form and buttons
    }

  onSave() {
    if(this.name == '') {
      this.notificationService.sendError('Error', 'Band name cannot be empty.');
      return;
      }

    if(this.update == false) {
    this.bandService.saveBand(this.name, this.linkWikiPage).subscribe({
      next: () => {
        this.notificationService.sendSuccess('Success', `Band ${this.name} has been added`);
        this.router.navigate(['/band-list']);
        },
      error: err => {
        console.error('Error:', err);
        this.notificationService.sendError('Error', `Error: ${err.message}`);
        }
      });
    } else {
      this.bandService.modifyBand(this.band.name, this.band.linkWikiPage, this.band.id).subscribe({
        next: () => this.router.navigate(['/band-list']),
        error: err => {
          console.error('Error:', err);
          this.notificationService.sendError('Error', err.message);
          }
        });
      }
  }

  onCancel() {
    this.router.navigate(['/band-list']);
  }
}
