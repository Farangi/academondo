import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLabComponent } from './manage-lab.component';

describe('ManageLabComponent', () => {
  let component: ManageLabComponent;
  let fixture: ComponentFixture<ManageLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
