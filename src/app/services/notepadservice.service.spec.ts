import { TestBed } from '@angular/core/testing';

import { NotepadserviceService } from './notepadservice.service';

describe('NotepadserviceService', () => {
  let service: NotepadserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotepadserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
