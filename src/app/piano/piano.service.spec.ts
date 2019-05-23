import { TestBed } from '@angular/core/testing';

import { PianoService } from './piano.service';

describe('PianoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PianoService = TestBed.get(PianoService);
    expect(service).toBeTruthy();
  });
});
