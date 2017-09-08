import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcademondoComponent } from './my-academondo.component';

describe('MyAcademondoComponent', () => {
  let component: MyAcademondoComponent;
  let fixture: ComponentFixture<MyAcademondoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAcademondoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAcademondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
