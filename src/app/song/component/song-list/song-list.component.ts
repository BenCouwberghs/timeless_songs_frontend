import { Component, OnInit } from '@angular/core';

import { SongService } from '../../service/song.service';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [ToolbarModule],
  templateUrl: './song-list.component.html',
})
export class SongListComponent implements OnInit {
  songs: any[] = [];

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.songService.fetchSongs().subscribe(data => {
      this.songs = data;
    })

  }
}
