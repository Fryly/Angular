import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSignUpComponent } from './pop-up-sign-up.component';

describe('PopUpSignUpComponent', () => {
  let component: PopUpSignUpComponent;
  let fixture: ComponentFixture<PopUpSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
