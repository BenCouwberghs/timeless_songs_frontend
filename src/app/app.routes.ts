import { Routes } from '@angular/router';
import {BandListComponent} from './band/component/band-list/band-list.component';
import {BandFormComponent} from './band/component/band-form/band-form.component';
import {HeroComponent} from './pages/hero/hero.component';
import {CreditsComponent} from './pages/credits/credits.component';
import { SongListComponent } from './song/component/song-list/song-list.component';
import { SongFormComponent } from './song/component/song-form/song-form.component';

export const routes: Routes = [
{path: '', component: HeroComponent},
{path: 'hero', component: HeroComponent},
{path: 'band-list', component: BandListComponent},
{path: 'band-form', component: BandFormComponent},
{path: 'band-form/:id', component: BandFormComponent},
{path: 'credits', component: CreditsComponent},
{path: 'song-list', component: SongListComponent},
{path: 'song-form', component: SongFormComponent},
{path: 'song-form/:id', component: SongFormComponent},
  ];
