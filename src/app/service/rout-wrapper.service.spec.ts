import { TestBed } from '@angular/core/testing';

import { RoutWrapperService } from './rout-wrapper.service';

describe('RoutWrapperService', () => {
  let service: RoutWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
