import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { BandService } from '../../service/band.service';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from '../../../service/notification.service'
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-band-form',
  imports: [
  FormsModule, InputTextModule, FluidModule, ToastModule, ButtonModule, ConfirmDialogModule
    ],
  providers: [ConfirmationService],
  templateUrl: './band-form.component.html',
  styleUrl: './band-form.component.scss'
})
export class BandFormComponent {
  name: string = '';
  linkWikiPage: string  = '';
  band: any;
  update = false;
  id: any;

  constructor(private route: ActivatedRoute, private router: Router, private bandService: BandService,
    private notificationService: NotificationService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id != null) {
       this.update = true;
       this.bandService.fetchBand(this.id).subscribe(res => {
         this.band = res;
         this.name = this.band.name;
         this.linkWikiPage = this.band.linkWikiPage;
       });
    }
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
      this.bandService.modifyBand(this.name, this.linkWikiPage, this.id).subscribe({
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

  onDelete() {
    this.bandService.deleteBand(this.id).subscribe({
        next: () => {
            this.notificationService.sendInfo('Confirmed', `You have deleted the band ${this.band.name}`);
            this.router.navigate(['/band-list']);
            },
        error: err => {
          console.error('Error:', err);
          this.notificationService.sendError('Error', err.message);
          }
        });
    }

  deleteEvent(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete the band ${this.band.name}?`,
      header: 'Confirm delete action',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Delete',
          severity: 'danger',
      },

      accept: () => {
        this.onDelete();
      },
      reject: () => {
        this.notificationService.sendError('Rejected', 'You have rejected');
      },

      })
    }
}
