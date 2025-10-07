import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { BandService } from '../../service/band.service';

import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-band-list',
  imports: [RouterLink, FormsModule, InputTextModule, ButtonModule, ToolbarModule, InputGroupModule,
    InputGroupAddonModule, TooltipModule],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent implements OnInit {
    searchInputVisible = false;
    originalBands: any[] = [];
    keyword: string = '';
    bands: any[] = [];

    constructor(private bandService: BandService) {}

    ngOnInit() {
      this.bandService.fetchBands().subscribe(data => {
        this.originalBands = data;
        this.bands = data;
        });

     }

    showSearchInput() {
      this.searchInputVisible = true;
    }

    hideSearchInput() {
      this.searchInputVisible = false;
    }

   onSearch() {
      this.bands = this.originalBands.filter(
        band => band.name.toLowerCase().includes(this.keyword.toLowerCase()));
     }

   clear() {
     this.keyword = '';
     this.ngOnInit();
     }
}
