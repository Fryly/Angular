import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSignInComponent } from './pop-up-sign-in.component';

describe('PopUpSignInComponent', () => {
  let component: PopUpSignInComponent;
  let fixture: ComponentFixture<PopUpSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
