import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSongVideosComponent } from './search-song-videos.component';

describe('SearchSongVideosComponent', () => {
  let component: SearchSongVideosComponent;
  let fixture: ComponentFixture<SearchSongVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSongVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSongVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
