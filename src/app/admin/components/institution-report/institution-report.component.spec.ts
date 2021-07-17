import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionReportComponent } from './institution-report.component';

describe('InstitutionReportComponent', () => {
  let component: InstitutionReportComponent;
  let fixture: ComponentFixture<InstitutionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
