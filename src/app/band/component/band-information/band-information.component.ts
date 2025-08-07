import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { BandService } from '../../service/band.service';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NotificationService } from '../../../service/notification.service'

@Component({
  selector: 'app-band-information',
  imports: [FormsModule, InputTextModule, FluidModule, ButtonModule, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './band-information.component.html',
  styleUrl: './band-information.component.scss'
})
export class BandInformationComponent implements OnInit {
    band: any;
    showForm = false;
    id: any;

  constructor(private route: ActivatedRoute, private router : Router, private bandService: BandService,
    private confirmationService: ConfirmationService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.bandService.fetchBand(this.id).subscribe(res => this.band = res);
    }

  onSave() {
    if(this.band.name == '') {
      this.notificationService.sendError('Error', 'Band name cannot be empty.');

      return;
    }

    this.bandService.modifyBand(this.band.name, this.band.linkWikiPage, this.band.id).subscribe({
          next: () => this.router.navigate(['/band-list']),
          error: err => {
            console.error('Error:', err);
            this.notificationService.sendError('Error', err.message);
            }
          });
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
