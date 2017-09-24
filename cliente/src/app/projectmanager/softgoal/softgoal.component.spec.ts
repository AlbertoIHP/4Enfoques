import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftgoalComponent } from './softgoal.component';

describe('SoftgoalComponent', () => {
  let component: SoftgoalComponent;
  let fixture: ComponentFixture<SoftgoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftgoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftgoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
