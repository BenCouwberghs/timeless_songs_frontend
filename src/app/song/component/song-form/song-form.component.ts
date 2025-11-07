import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { SongPlayerComponent } from '../../../sharedComponents/song-player/song-player.component';
import { RatingModule } from 'primeng/rating';
import { MultiSelectModule } from 'primeng/multiselect';


import { NotificationService } from '@service/notification.service'
import { SongService } from '@service/song.service';
import { BandService } from '@service/band.service';
import { GenreService } from '@service/genre.service';
import { Band } from '@model/band';
import { Song } from '@model/song';

@Component({
  selector: 'app-song-form',
  imports: [FormsModule, InputTextModule, ButtonModule, FluidModule, ConfirmDialogModule, InputGroupModule,
    InputGroupAddonModule, SelectModule, SongPlayerComponent, RatingModule, MultiSelectModule],
  providers: [ConfirmationService],
  templateUrl: './song-form.component.html',
})

export class SongFormComponent {
  bands: Band[] = [];
  genres: any[] = [];
  song: Song = {
    name: '',
    year: 0,
    wikiLinkPage: '',
    youTubeClipCode: '',
    genres: '',
    rating: 0
  };
  update = false;
  id: any;

  constructor(private route: ActivatedRoute, private router: Router, private songService: SongService,
    private bandService: BandService, private genreService: GenreService,
    private notificationService: NotificationService,private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.bandService.fetchBands().subscribe(retrievedBands => {
      this.bands = retrievedBands;

      this.id = this.route.snapshot.paramMap.get('id');
          if(this.id != null) {
            this.update = true;
            this.songService.fetchSong(this.id).subscribe(retrievedSong => {
              this.song = retrievedSong;
              this.song.band = this.bands.find(b => b.id === this.song.band?.id);
            })
          }
    })

    this.genreService.fetchGenres().subscribe(retrievedGenres => {
      this.genres = retrievedGenres;
    })
  }

  onSave() {
    if(this.song.name == '') {
      this.notificationService.sendError('Error', 'Song name cannot be empty.');
      return;
    }

    if(this.update == false) {
      this.songService.saveSong(this.song).subscribe({
        next: () => {
          this.notificationService.sendSuccess('Success', `song ${this.song.name} has been added`);
          this.gotoSongList();
        },
        error: err => {
          console.error('Error:', err);
          this.notificationService.sendError('Error', `Error: ${err.message}`);
        }
      });
    } else {
      this.songService.modifySong(this.song).subscribe({
        next: () => {
          this.notificationService.sendSuccess('Success', `song ${this.song.name} has been modified`);
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
