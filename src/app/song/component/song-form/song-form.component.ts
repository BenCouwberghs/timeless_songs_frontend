import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { SongService } from '../../service/song.service';
import { BandService } from '../../../band/service/band.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { NotificationService } from '../../../service/notification.service'
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-song-form',
  imports: [FormsModule, InputTextModule, ButtonModule, FluidModule, ConfirmDialogModule, InputGroupModule,
    InputGroupAddonModule, SelectModule],
  providers: [ConfirmationService],
  templateUrl: './song-form.component.html',
})

export class SongFormComponent {
  name: string = '';
  linkWikiPage: string  = '';
  year: number = 0;
  selectedBand: any;
  bands: any[] = [];
  song: any;
  update = false;
  id: any;

  constructor(private router: Router, private songService: SongService, private bandService: BandService,
    private notificationService: NotificationService,private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.bandService.fetchBands().subscribe(data => {
        this.bands = data;
      })
  }

  onSave() {
    this.songService.saveSong(this.name, this.selectedBand, this.year, this.linkWikiPage).subscribe({
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
    this.gotoSongList();
  }
}
