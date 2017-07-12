import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAssignComponent } from './un-assign.component';

describe('UnAssignComponent', () => {
  let component: UnAssignComponent;
  let fixture: ComponentFixture<UnAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
