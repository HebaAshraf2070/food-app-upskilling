import { TestBed } from '@angular/core/testing';

import { CategoryserService } from './categoryser.service';

describe('CategoryserService', () => {
  let service: CategoryserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
