import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { BandService } from '../../service/band.service';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-new-band-form',
  imports: [
  FormsModule, InputTextModule, FluidModule, ToastModule, ButtonModule
    ],
  providers: [MessageService],
  templateUrl: './new-band-form.component.html',
  styleUrl: './new-band-form.component.scss'
})
export class NewBandFormComponent {
  name: string = '';
  linkWikiPage: string  = '';

  constructor(private router: Router, private bandService: BandService, private messageService: MessageService ) {}

  onSave() {
    if(this.name == '') {
      alert('Band name cannot be empty.');
      return;
      }

    this.bandService.saveBand(this.name, this.linkWikiPage).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: `Band ${this.name} has been added`,
          life: 3000});
          setTimeout(() => {
            this.router.navigate(['/band-list']);
          }, 3000);
        },
      error: err => {
        console.error('Error:', err);
        alert(err.message);
        }
      });
    }

  onCancel() {
    this.router.navigate(['/band-list']);
  }
}
