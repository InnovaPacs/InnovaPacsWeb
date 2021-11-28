import { TestBed } from '@angular/core/testing';

import { InnovaFileService } from './innova-file.service';

describe('InnovaFileService', () => {
  let service: InnovaFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnovaFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
