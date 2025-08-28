import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { BandService } from '../../service/band.service';

import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-band-list',
  imports: [RouterLink, FormsModule, InputTextModule, ButtonModule, ToolbarModule,
    TooltipModule],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent implements OnInit {
    bands: any[] = [];
    keyword: string = '';

    constructor(private bandService: BandService) {}

    ngOnInit() {
      this.bandService.fetchBands().subscribe(data => this.bands = data);
     }

   onSearch() {
      this.bandService.search(this.keyword).subscribe(data => this.bands = data);
     }

   clear() {
     this.keyword = '';
     this.ngOnInit();
     }
}
