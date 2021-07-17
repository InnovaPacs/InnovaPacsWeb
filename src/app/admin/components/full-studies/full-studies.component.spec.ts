import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullStudiesComponent } from './full-studies.component';

describe('FullStudiesComponent', () => {
  let component: FullStudiesComponent;
  let fixture: ComponentFixture<FullStudiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
