import { TestBed } from '@angular/core/testing';

import { Dcm4cheeService } from './dcm4chee.service';

describe('Dcm4cheeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Dcm4cheeService = TestBed.get(Dcm4cheeService);
    expect(service).toBeTruthy();
  });
});
