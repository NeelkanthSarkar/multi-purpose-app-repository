import { TestBed } from '@angular/core/testing';

import { WebchatprofileService } from './webchatprofile.service';

describe('WebchatprofileService', () => {
  let service: WebchatprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebchatprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
