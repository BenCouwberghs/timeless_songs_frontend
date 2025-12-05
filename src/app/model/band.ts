import { Song } from './song';

export interface Band {
  id?: number;
  name: string;
  linkWikiPage: string;
  comments: string;
  songs?: Song[];
  pinned: boolean;
}
