import { Component, Input } from '@angular/core';
import { SafeUrlPipe } from '../../service/safe-url.pipe';

@Component({
  selector: 'app-song-player',
  imports: [SafeUrlPipe],
  templateUrl: './song-player.component.html',
  styleUrl: './song-player.component.scss'
})

export class SongPlayerComponent {
  @Input()
  clipCode?: string;

      get videoUrl() {
        return `https://www.youtube.com/embed/${this.clipCode}`;
      }
}
