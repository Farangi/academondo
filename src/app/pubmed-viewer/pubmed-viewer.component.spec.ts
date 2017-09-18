import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmedViewerComponent } from './pubmed-viewer.component';

describe('PubmedViewerComponent', () => {
  let component: PubmedViewerComponent;
  let fixture: ComponentFixture<PubmedViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubmedViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubmedViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
