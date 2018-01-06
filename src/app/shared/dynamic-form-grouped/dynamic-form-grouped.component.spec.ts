import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormGroupedComponent } from './dynamic-form-grouped.component';

describe('DynamicFormGroupedComponent', () => {
  let component: DynamicFormGroupedComponent;
  let fixture: ComponentFixture<DynamicFormGroupedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormGroupedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
