import { Routes } from '@angular/router';
import {BandListComponent} from './band/component/band-list/band-list.component';
import {NewBandFormComponent} from './band/component/new-band-form/new-band-form.component';
import {BandInformationComponent} from './band/component/band-information/band-information.component';

export const routes: Routes = [
{path: 'band-list', component: BandListComponent},
{path: 'band-form', component: NewBandFormComponent},
{path: 'band-information', component: BandInformationComponent}
  ];
