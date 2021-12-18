import { TestBed } from '@angular/core/testing';

import { DiagnosisTemplateConfigService } from './diagnosis-template-config.service';

describe('DiagnosisTemplateConfigService', () => {
  let service: DiagnosisTemplateConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosisTemplateConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
