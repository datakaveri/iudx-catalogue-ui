import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemResItemsComponent } from './item-res-items.component';

describe('ItemResItemsComponent', () => {
  let component: ItemResItemsComponent;
  let fixture: ComponentFixture<ItemResItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemResItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemResItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
