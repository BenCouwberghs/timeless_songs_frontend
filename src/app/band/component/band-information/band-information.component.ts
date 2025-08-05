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
    private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.bandService.fetchBand(this.id).subscribe(res => this.band = res);
    }

  onSave() {
    if(this.band.name == '') {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Band name cannot be empty.', life: 3000});

      return;
    }

    this.bandService.modifyBand(this.band.name, this.band.linkWikiPage, this.band.id).subscribe({
          next: () => this.router.navigate(['/band-list']),
          error: err => {
            console.error('Error:', err);
            this.sendErrorMessage(err);
            }
          });
    }

  onDelete() {
    this.bandService.deleteBand(this.id).subscribe({
        next: () => { setTimeout(() => { this.router.navigate(['/band-list']); }, 3000); },
        error: err => {
          console.error('Error:', err);
          this.sendErrorMessage(err);
          }
        });
    }

  sendErrorMessage(err: any) {
    this.messageService.add({ severity: 'error', summary: 'error', detail: `Error: ${err.message}`, life: 3000});
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
          this.messageService.add({ severity: 'info', summary: 'Confirmed',
            detail: `You have deleted the band ${this.band.name}`, life: 3000 });
            this.onDelete();
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },

      })
    }
}
