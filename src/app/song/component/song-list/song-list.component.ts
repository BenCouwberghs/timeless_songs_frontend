import { Component, OnInit } from '@angular/core';

import { SongService } from '../../service/song.service';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [],
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
