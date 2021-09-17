import { TestBed } from '@angular/core/testing';

import { LompadService } from './lompad.service';

describe('LompadService', () => {
  let service: LompadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LompadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
