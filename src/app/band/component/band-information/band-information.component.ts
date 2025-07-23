import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { BandService } from '../../service/band.service';

@Component({
  selector: 'app-band-information',
  imports: [FormsModule],
  templateUrl: './band-information.component.html',
  styleUrl: './band-information.component.scss'
})
export class BandInformationComponent implements OnInit {
    band: any;
    showForm = false;
    id: any;

  constructor(private route: ActivatedRoute, private router : Router, private bandService: BandService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.bandService.fetchBand(this.id).subscribe(res => this.band = res);
    }

  onSave() {
    this.bandService.modifyBand(this.band.name, this.band.linkWikiPage, this.band.id).subscribe({
          next: () => this.router.navigate(['/band-list']),
          error: err => console.error('Error:', err)
          });
    }
  onDelete() {
    this.bandService.deleteBand(this.id).subscribe({
        next: () => this.router.navigate(['/band-list']),
        error: err => console.error('Error:', err)
        });
    }
}
