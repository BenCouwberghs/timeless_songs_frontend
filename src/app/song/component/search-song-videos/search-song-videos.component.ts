import { Component, Input } from '@angular/core';
import { SearchVideosService } from '@service/search-videos.service';

@Component({
  selector: 'app-search-song-videos',
  imports: [],
  templateUrl: './search-song-videos.component.html',
  styleUrl: './search-song-videos.component.scss'
})
export class SearchSongVideosComponent {

  @Input()
  bandName!: string;
  songTitle!: string;
}
