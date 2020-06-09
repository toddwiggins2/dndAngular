import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavagationbarComponent } from './navagationbar.component';

describe('NavagationbarComponent', () => {
  let component: NavagationbarComponent;
  let fixture: ComponentFixture<NavagationbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavagationbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavagationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
