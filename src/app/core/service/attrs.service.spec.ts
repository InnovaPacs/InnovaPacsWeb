import { TestBed } from '@angular/core/testing';

import { AttrsService } from './attrs.service';

describe('AttrsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttrsService = TestBed.get(AttrsService);
    expect(service).toBeTruthy();
  });
});
