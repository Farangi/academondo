/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LabService } from './lab.service';

describe('Service: Lab', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabService]
    });
  });

  it('should ...', inject([LabService], (service: LabService) => {
    expect(service).toBeTruthy();
  }));
});
