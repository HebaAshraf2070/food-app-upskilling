import { TestBed } from '@angular/core/testing';

import { SharedSerService } from './shared-ser.service';

describe('SharedSerService', () => {
  let service: SharedSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
