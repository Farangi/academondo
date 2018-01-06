import { TestBed, inject } from '@angular/core/testing';

import { GroupedQuestionControlService } from './grouped-question-control.service';

describe('GroupedQuestionControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupedQuestionControlService]
    });
  });

  it('should be created', inject([GroupedQuestionControlService], (service: GroupedQuestionControlService) => {
    expect(service).toBeTruthy();
  }));
});
