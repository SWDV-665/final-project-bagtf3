import { TestBed } from '@angular/core/testing';

import { GroceriesProviderService } from './groceries-provider.service';

describe('GroceriesProviderService', () => {
  let service: GroceriesProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceriesProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
