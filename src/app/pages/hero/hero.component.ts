import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [RouterLink, ButtonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  constructor() {}
}
