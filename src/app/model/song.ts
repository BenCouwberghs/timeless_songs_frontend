import { Band } from './band';
import { Genre } from './genre';

export interface Song {
  id?: number;
  name: string;
  band?: Band;
  year: number;
  wikiLinkPage: string;
  youTubeClipCode: string;
  genres: Genre[];
  rating: number;
}
