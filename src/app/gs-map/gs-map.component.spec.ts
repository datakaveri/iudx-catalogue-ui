import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsMapComponent } from './gs-map.component';

describe('GsMapComponent', () => {
  let component: GsMapComponent;
  let fixture: ComponentFixture<GsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
