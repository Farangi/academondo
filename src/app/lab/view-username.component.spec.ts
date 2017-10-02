import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsernameComponent } from './view-username.component';

describe('ViewUsernameComponent', () => {
  let component: ViewUsernameComponent;
  let fixture: ComponentFixture<ViewUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
