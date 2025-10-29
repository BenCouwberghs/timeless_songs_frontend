import { Injectable } from '@angular/core';
import { Band } from '../model/band';
import { BandSortId } from '../model/sorting';

@Injectable({
  providedIn: 'root'
})

export class SortService {

  constructor() {}

  sortBand(bands: Band[], bandSortId: BandSortId): Band[] {
    if (!bands || bands.length === 0) return [];

    switch (bandSortId) {
      case ('bandsAsc'): {
        return [...bands].sort((a, b) => a.name.localeCompare(b.name));
      }

      case ('bandsDes'): {
        return [...bands].sort((a, b) => b.name.localeCompare(a.name));
      }

      case ('songsAsc'): {
        return [...bands].sort((a, b) => (a.songs?.length || 0) - (b.songs?.length || 0));
      }

      case ('songsDes'): {
        return [...bands].sort((a, b) => (b.songs?.length || 0) - (a.songs?.length || 0));
      }
    }
  }
}
