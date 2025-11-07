import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { NotificationService } from '@service/notification.service'
import { BandService } from '@service/band.service';
import { Band } from '@model/band';

@Component({
  selector: 'app-band-form',
  imports: [
  FormsModule, InputTextModule, FluidModule, ToastModule, ButtonModule, ConfirmDialogModule,
    InputGroupModule, InputGroupAddonModule, TextareaModule, RouterLink, ToggleSwitchModule],
  providers: [ConfirmationService],
  templateUrl: './band-form.component.html',
  styleUrl: './band-form.component.scss'
})
export class BandFormComponent {

  band: Band = {
    name:'',
    linkWikiPage: '',
    comments: '',
    pinned: 0
  }
  update = false;
  id: any;

  constructor(private route: ActivatedRoute, private router: Router, private bandService: BandService,
    private notificationService: NotificationService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id != null) {
       this.update = true;
       this.bandService.fetchBand(this.id).subscribe(receivedBand => {
         this.band = receivedBand;
       });
    }
  }

  onSave() {
    if(this.band.name == '') {
      this.notificationService.sendError('Error', 'Band name cannot be empty.');
      return;
    }

    if(this.update == false) {
    this.bandService.saveBand(this.band).subscribe({
      next: () => {
        this.notificationService.sendSuccess('Success', `Band ${this.band.name} has been added`);
        this.gotoBandList();
        },
      error: err => {
        console.error('Error:', err);
        this.notificationService.sendError('Error', `Error: ${err.message}`);
        }
      });
    } else {
      this.bandService.modifyBand(this.band).subscribe({
        next: () => {
          this.notificationService.sendSuccess('Success', `Band ${this.band.name} has been successfully modified`);
          this.gotoBandList();
          },
        error: err => {
          console.error('Error:', err);
          this.notificationService.sendError('Error', err.message);
          }
        });
      }
  }

  onCancel() {
    this.gotoBandList();
  }

  onDelete() {
    this.bandService.deleteBand(this.id).subscribe({
        next: () => {
            this.notificationService.sendInfo('Confirmed', `You have deleted the band ${this.band.name}`);
            this.gotoBandList();
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

  gotoBandList() {
    this.router.navigate(['/band-list']);
  }
}
