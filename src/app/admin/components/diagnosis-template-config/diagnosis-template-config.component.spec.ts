import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisTemplateConfigComponent } from './diagnosis-template-config.component';

describe('DiagnosisTemplateConfigComponent', () => {
  let component: DiagnosisTemplateConfigComponent;
  let fixture: ComponentFixture<DiagnosisTemplateConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisTemplateConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisTemplateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
