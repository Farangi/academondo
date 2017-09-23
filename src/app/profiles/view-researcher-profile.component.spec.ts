import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResearcherProfileComponent } from './view-researcher-profile.component';

describe('ViewResearcherProfileComponent', () => {
  let component: ViewResearcherProfileComponent;
  let fixture: ComponentFixture<ViewResearcherProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResearcherProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResearcherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
