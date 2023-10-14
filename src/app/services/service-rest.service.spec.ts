import { TestBed } from '@angular/core/testing';

import { ServiceRestService } from './service-rest.service';

describe('ServiceRestService', () => {
  let service: ServiceRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
