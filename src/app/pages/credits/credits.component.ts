import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './credits.component.html',
})
export class CreditsComponent {
}
