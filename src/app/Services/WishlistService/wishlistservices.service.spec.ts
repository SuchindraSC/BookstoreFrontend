import { TestBed } from '@angular/core/testing';

import { WishlistservicesService } from './wishlistservices.service';

describe('WishlistservicesService', () => {
  let service: WishlistservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
