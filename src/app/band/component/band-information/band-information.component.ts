import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { BandService } from '../../service/band.service';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-band-information',
  imports: [FormsModule, InputTextModule, FluidModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './band-information.component.html',
  styleUrl: './band-information.component.scss'
})
export class BandInformationComponent implements OnInit {
    band: any;
    showForm = false;
    id: any;

  constructor(private route: ActivatedRoute, private router : Router, private bandService: BandService,
    private messageService: MessageService) {}

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
            this.messageService.add({ severity: 'error', summary: 'error', detail: `Error: ${err.message}`,
              life: 3000});
            }
          });
    }

  onDelete() {
    this.bandService.deleteBand(this.id).subscribe({
        next: () => this.router.navigate(['/band-list']),
        error: err => {
          console.error('Error:', err);
          this.messageService.add({ severity: 'error', summary: 'error', detail: `Error: ${err.message}`,
          life: 3000});
          }
        });
    }
}
