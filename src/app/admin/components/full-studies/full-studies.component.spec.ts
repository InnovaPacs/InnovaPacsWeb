import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullStudiesComponent } from './full-studies.component';

describe('FullStudiesComponent', () => {
  let component: FullStudiesComponent;
  let fixture: ComponentFixture<FullStudiesComponent>;

  beforeEach(async(() => {
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
