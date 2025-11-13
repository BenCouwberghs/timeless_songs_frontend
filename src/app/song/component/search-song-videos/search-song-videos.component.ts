import { Component, Input, OnInit } from '@angular/core';
import { SearchVideosService } from '@service/search-videos.service';

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

  constructor(private searchVideosService: SearchVideosService) {}

  ngOnInit() {
    this.searchVideosService.search(this.bandName, this.songTitle).subscribe(retrievedResults => {
      this.videoResults = retrievedResults;
    })
  }
}
