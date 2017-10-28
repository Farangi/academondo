import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTinyMCEComponent } from './simple-tiny-mce.component';

describe('SimpleTinyMCEComponent', () => {
  let component: SimpleTinyMCEComponent;
  let fixture: ComponentFixture<SimpleTinyMCEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTinyMCEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTinyMCEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
