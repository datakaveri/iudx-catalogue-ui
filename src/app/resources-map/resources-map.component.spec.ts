import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesMapComponent } from './resources-map.component';

describe('ResourcesMapComponent', () => {
  let component: ResourcesMapComponent;
  let fixture: ComponentFixture<ResourcesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
