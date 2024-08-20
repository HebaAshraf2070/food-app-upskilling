import { TestBed } from '@angular/core/testing';

import { RecipesserService } from './recipesser.service';

describe('RecipesserService', () => {
  let service: RecipesserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
