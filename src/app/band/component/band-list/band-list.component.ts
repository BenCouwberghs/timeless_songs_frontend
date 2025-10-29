import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { BandService } from '../../service/band.service';
import { SortService } from '../../../service/sort.service';

import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButton } from 'primeng/radiobutton';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PopoverModule } from 'primeng/popover';

import { Band } from '../../../model/band';
import { BandOverviewInfoComponent } from './band-overview-info/band-overview-info.component';
import { kindOfBandSorts, BandSortId, BandSort } from '../../../model/sorting';

@Component({
  selector: 'app-band-list',
  imports: [RouterLink, FormsModule, InputTextModule, ButtonModule, ToolbarModule, InputGroupModule,
    InputGroupAddonModule, TooltipModule, RadioButton, PopoverModule, BandOverviewInfoComponent],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent implements OnInit {
    searchInputVisible = false;
    originalBands: Band[] = [];
    keyword: string = '';
    bands: Band[] = [];
    sorts = kindOfBandSorts;
    selectedSort: BandSortId = 'bandsAsc';

    constructor(private bandService: BandService, private sortService: SortService) {}

    ngOnInit() {
      this.bandService.fetchBands().subscribe(data => {
        this.originalBands = data;
        this.applySort();
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

   applySort() {
    console.log('Applied sorting for bands:', this.selectedSort);
    this.bands = this.sortService.sortBand(this.originalBands, this.selectedSort);

   }
}
