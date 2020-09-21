import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGsMapComponent } from './item-gs-map.component';

describe('ItemGsMapComponent', () => {
  let component: ItemGsMapComponent;
  let fixture: ComponentFixture<ItemGsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
