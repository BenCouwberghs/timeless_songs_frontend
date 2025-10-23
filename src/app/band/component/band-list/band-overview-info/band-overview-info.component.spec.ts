import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandOverviewInfoComponent } from './band-overview-info.component';

describe('BandOverviewInfoComponent', () => {
  let component: BandOverviewInfoComponent;
  let fixture: ComponentFixture<BandOverviewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandOverviewInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandOverviewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
