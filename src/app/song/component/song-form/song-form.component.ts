import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router, private songService: SongService, private bandService: BandService,
    private notificationService: NotificationService,private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.bandService.fetchBands().subscribe(retrievedBands => {
      this.bands = retrievedBands;

      this.id = this.route.snapshot.paramMap.get('id');
          if(this.id != null) {
            this.update = true;
            this.songService.fetchSong(this.id).subscribe(retrievedSong => {
              this.song = retrievedSong;
              this.name = this.song.name;
              this.year = this.song.year;
              this.linkWikiPage = this.song.wikiLinkPage;

              this.selectedBand = this.bands.find(b => b.id === this.song.band.id);
            })
          }
    })
  }

  onSave() {
    if(this.name == '') {
      this.notificationService.sendError('Error', 'Song name cannot be empty.');
      return;
    }

    if(this.update == false) {
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
    } else {
      this.songService.modifySong(this.name, this.selectedBand, this.year, this.linkWikiPage, this.id).subscribe({
        next: () => {
          this.notificationService.sendSuccess('Success', `song ${this.name} has been modified`);
          this.gotoSongList();
        },
        error: err => {
          console.error('Error', err);
          this.notificationService.sendError('Error', `Error: ${err.message}`);
        }
      });
    }
  }

  onDelete() {
    this.songService.deleteSong(this.id).subscribe({
      next: () => {
        this.notificationService.sendInfo('Confirmed', `You have deleted the song ${this.song.name}`);
        this.gotoSongList();
      },
      error: err => {
        console.error('Error', err);
        this.notificationService.sendError('Error', `Error: ${err.message}`);
      }
    })
  }

  deleteEvent(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete the song ${this.song.name}?`,
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

  gotoSongList() {
    this.router.navigate(['/song-list']);
  }

  onCancel() {
    this.gotoSongList();
  }
}
