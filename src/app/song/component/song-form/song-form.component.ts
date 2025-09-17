import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { SongService } from '../../service/song.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { NotificationService } from '../../../service/notification.service'
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-song-form',
  imports: [FormsModule, InputTextModule, ButtonModule, FluidModule, ConfirmDialogModule, InputGroupModule,
    InputGroupAddonModule],
  providers: [ConfirmationService],
  templateUrl: './song-form.component.html',
})

export class SongFormComponent {
  name: string = '';
  linkWikiPage: string  = '';
  year: number = 0;
  band: any;
  song: any;
  update = false;
  id: any;

  constructor(private router: Router, private songService: SongService, private notificationService: NotificationService,
    private confirmationService: ConfirmationService) {}

  onSave() {
    this.songService.saveSong(this.name, this.band, this.year, this.linkWikiPage).subscribe({
      next: () => {
        this.notificationService.sendSuccess('Success', `song ${this.name} has been added`);
        this.gotoSongList();
        },
      error: err => {
        console.error('Error:', err);
        this.notificationService.sendError('Error', `Error: ${err.message}`);
        }
      });

  }

  gotoSongList() {
    this.router.navigate(['/song-list']);
  }

  onCancel() {

  }
}
