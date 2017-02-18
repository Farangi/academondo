/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FieldOfInterestService } from './field-of-interest.service';

describe('Service: FieldOfInterest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldOfInterestService]
    });
  });

  it('should ...', inject([FieldOfInterestService], (service: FieldOfInterestService) => {
    expect(service).toBeTruthy();
  }));
});
