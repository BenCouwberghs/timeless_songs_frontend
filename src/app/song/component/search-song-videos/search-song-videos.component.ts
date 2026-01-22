import { Component, Input, OnInit } from '@angular/core';
import { SearchVideosService } from '@service/search-videos.service';
import { DecodeHtmlPipe } from '@service/html-entities.pipe';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-search-song-videos',
  imports: [SkeletonModule, DecodeHtmlPipe],
  templateUrl: './search-song-videos.component.html',
  styleUrl: './search-song-videos.component.scss'
})
export class SearchSongVideosComponent {

  @Input() bandName!: string;
  @Input() songTitle!: string;

  videoResults: any[] = [];
  loading = true;

  constructor(private searchVideosService: SearchVideosService, public reference: DynamicDialogRef) {}

  ngOnInit() {
    this.searchVideosService.search(this.bandName, this.songTitle).subscribe(retrievedResults => {
      this.videoResults = retrievedResults;
      this.loading = false;
    })
  }

  selectVideo(video: any) {
    this.reference.close(video);
  }

  closeDialog() {
    this.reference.close(null);
  }
}
