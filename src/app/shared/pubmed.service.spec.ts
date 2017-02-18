/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PubmedService } from './pubmed.service';

describe('Service: Pubmed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PubmedService]
    });
  });

  it('should ...', inject([PubmedService], (service: PubmedService) => {
    expect(service).toBeTruthy();
  }));
});
