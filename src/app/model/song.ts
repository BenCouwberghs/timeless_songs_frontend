import { Band } from './band';

export interface Song {
  id: number;
  name: string;
  band: Band;
  year: number;
  wikiLinkPage: string;
}
