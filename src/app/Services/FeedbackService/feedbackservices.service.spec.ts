import { TestBed } from '@angular/core/testing';

import { FeedbackservicesService } from './feedbackservices.service';

describe('FeedbackservicesService', () => {
  let service: FeedbackservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
