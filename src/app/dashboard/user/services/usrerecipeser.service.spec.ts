import { TestBed } from '@angular/core/testing';

import { UsrerecipeserService } from './usrerecipeser.service';

describe('UsrerecipeserService', () => {
  let service: UsrerecipeserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsrerecipeserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
