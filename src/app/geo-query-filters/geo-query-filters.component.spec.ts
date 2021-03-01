import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoQueryFiltersComponent } from './geo-query-filters.component';

describe('GeoQueryFiltersComponent', () => {
  let component: GeoQueryFiltersComponent;
  let fixture: ComponentFixture<GeoQueryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoQueryFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoQueryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
