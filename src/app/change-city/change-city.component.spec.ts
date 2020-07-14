import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCityComponent } from './change-city.component';

describe('ChangeCityComponent', () => {
  let component: ChangeCityComponent;
  let fixture: ComponentFixture<ChangeCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
