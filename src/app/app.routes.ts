import { Routes } from '@angular/router';
import {BandListComponent} from './band/component/band-list/band-list.component';
import {NewBandFormComponent} from './band/component/new-band-form/new-band-form.component';
import {BandInformationComponent} from './band/component/band-information/band-information.component';
import {HeroComponent} from './pages/hero/hero.component';
import {CreditsComponent} from './pages/credits/credits.component';
import { SongListComponent } from './song/component/song-list/song-list.component';

export const routes: Routes = [
{path: '', component: HeroComponent},
{path: 'hero', component: HeroComponent},
{path: 'band-list', component: BandListComponent},
{path: 'band-form', component: NewBandFormComponent},
{path: 'band-form/:id', component: NewBandFormComponent},
{path: 'band-information/:id', component: BandInformationComponent},
{path: 'credits', component: CreditsComponent},
{path: 'song-list', component: SongListComponent}
  ];
