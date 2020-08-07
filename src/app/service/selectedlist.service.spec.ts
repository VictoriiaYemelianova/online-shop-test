import { TestBed } from '@angular/core/testing';

import { SelectedlistService } from './selectedlist.service';

describe('SelectedlistService', () => {
  let service: SelectedlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
