import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { BandService } from '../../service/band.service';

@Component({
  selector: 'app-band-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent implements OnInit {
    bands: any[] = [];
    keyword: string = '';
    showClearButton = false;

    constructor(private bandService: BandService) {}

    ngOnInit() {
      this.bandService.fetchBands().subscribe(data => this.bands = data);
     }

   onSearch() {
      this.bandService.search(this.keyword).subscribe(data => this.bands = data);
     }

   clear() {
     this.keyword = '';
     this.showClearButton = false;
     this.ngOnInit();
     }
}
