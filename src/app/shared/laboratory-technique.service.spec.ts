/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LaboratoryTechniqueService } from './laboratory-technique.service';

describe('Service: LaboratoryTechnique', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaboratoryTechniqueService]
    });
  });

  it('should ...', inject([LaboratoryTechniqueService], (service: LaboratoryTechniqueService) => {
    expect(service).toBeTruthy();
  }));
});
