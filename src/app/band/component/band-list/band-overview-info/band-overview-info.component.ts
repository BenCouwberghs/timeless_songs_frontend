import { Component, Input} from '@angular/core';

import { Band } from '../../../../model/band';

@Component({
  selector: 'band-overview-info',
  imports: [],
  templateUrl: './band-overview-info.component.html',
  styleUrl: './band-overview-info.component.scss'
})
export class BandOverviewInfoComponent {

 @Input()
 band!: Band;

}
