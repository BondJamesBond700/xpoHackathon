import { TestBed, inject } from '@angular/core/testing';

import { XpoService } from './xpo.service';

describe('XpoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XpoService]
    });
  });

  it('should ...', inject([XpoService], (service: XpoService) => {
    expect(service).toBeTruthy();
  }));
});
