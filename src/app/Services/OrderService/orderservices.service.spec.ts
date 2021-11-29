import { TestBed } from '@angular/core/testing';

import { OrderservicesService } from './orderservices.service';

describe('OrderservicesService', () => {
  let service: OrderservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
