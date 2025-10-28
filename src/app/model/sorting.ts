export type TypeSorting = 'asc' | 'des'

export type BandSortId = 'songsAsc' | 'songsDes' | 'bandsAsc' | 'bandsDes';

export interface BandSort {
  id: BandSortId;
  type: TypeSorting;
  description: string;
}

export const kindOfBandSorts: BandSort[] = [
  { id: 'bandsAsc', type: 'asc', description: 'Name band' },
  { id: 'bandsDes', type: 'des', description: 'Name band' },
  { id: 'songsAsc', type: 'asc', description: 'Number songs' },
  { id: 'songsDes', type: 'des', description: 'Number songs' },
];
