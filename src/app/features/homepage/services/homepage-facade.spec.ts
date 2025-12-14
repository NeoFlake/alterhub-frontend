import { TestBed } from '@angular/core/testing';

import { HomepageFacade } from './homepage-facade';

describe('HomepageFacade', () => {
  let service: HomepageFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomepageFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
