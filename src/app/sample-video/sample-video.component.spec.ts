import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleVideoComponent } from './sample-video.component';

describe('SampleVideoComponent', () => {
  let component: SampleVideoComponent;
  let fixture: ComponentFixture<SampleVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
