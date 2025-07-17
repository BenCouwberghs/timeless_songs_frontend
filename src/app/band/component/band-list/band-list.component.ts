import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BandService } from '../../service/band.service';

@Component({
  selector: 'app-band-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent implements OnInit {
    bands: any[] = [];

    constructor(private bandService: BandService) {}

    ngOnInit() {
      this.bandService.fetchBands().subscribe(data => this.bands = data);
     }
}
