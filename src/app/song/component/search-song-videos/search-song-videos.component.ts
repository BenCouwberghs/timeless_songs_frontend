import { Component, Input, OnInit } from '@angular/core';
import { SearchVideosService } from '@service/search-videos.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-search-song-videos',
  imports: [],
  templateUrl: './search-song-videos.component.html',
  styleUrl: './search-song-videos.component.scss'
})
export class SearchSongVideosComponent {

  @Input() bandName!: string;
  @Input() songTitle!: string;

  videoResults: any[] = [];

  constructor(private searchVideosService: SearchVideosService, public reference: DynamicDialogRef) {}

  ngOnInit() {
    this.searchVideosService.search(this.bandName, this.songTitle).subscribe(retrievedResults => {
      this.videoResults = retrievedResults;
    })
  }

  selectVideo(video: any) {
    this.reference.close(video);
  }

  closeDialog() {
    this.reference.close(null);
  }
}
