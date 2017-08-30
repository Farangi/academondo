import { TestBed, inject } from '@angular/core/testing';

import { ResearcherProfileService } from './researcher-profile.service';

describe('ResearcherProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResearcherProfileService]
    });
  });

  it('should be created', inject([ResearcherProfileService], (service: ResearcherProfileService) => {
    expect(service).toBeTruthy();
  }));
});
