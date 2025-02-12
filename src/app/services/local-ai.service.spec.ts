import { TestBed } from '@angular/core/testing';

import { LocalAiService } from './local-ai.service';

describe('LocalAiService', () => {
  let service: LocalAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
