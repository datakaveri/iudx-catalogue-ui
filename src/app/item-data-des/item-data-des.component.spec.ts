import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDataDesComponent } from './item-data-des.component';

describe('ItemDataDesComponent', () => {
  let component: ItemDataDesComponent;
  let fixture: ComponentFixture<ItemDataDesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDataDesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDataDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
