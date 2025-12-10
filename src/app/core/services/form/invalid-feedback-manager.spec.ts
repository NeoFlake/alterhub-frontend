import { TestBed } from '@angular/core/testing';

import { InvalidFeedbackManager } from './invalid-feedback-manager';

describe('InvalidFeedbackManager', () => {
  let service: InvalidFeedbackManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvalidFeedbackManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
