import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pop-up-sign-up',
  templateUrl: './pop-up-sign-up.component.html',
  styleUrls: ['./pop-up-sign-up.component.css']
})
export class PopUpSignUpComponent implements OnInit {

  @Input() showSignUp: boolean;
  registerForm: FormGroup
  thank: boolean
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage: any;

  constructor(private popUp: HeaderComponent, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      сonfirmPassword: ['', Validators.required]
    })
  }

  goBack(): void {
    this.popUp.showUp()
  }

  handleClick(event) {
    event.stopPropagation();
  }

  onSubmit() {
    console.log(this.registerForm.get("email").invalid)
    if(this.registerForm.get('password').value !== this.registerForm.get('сonfirmPassword').value){
      this.errorMessage = 'Password not entered and (or) entered passwords do not match'
    }else if (this.registerForm.get("email").invalid) {
      this.errorMessage = 'Invalid email'
    }else{
      this.authService.register(this.registerForm.get('email').value, this.registerForm.get('password').value).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.registerForm.reset();
          this.goBack();
          this.thank = !this.thank
        },
        err => {
          this.errorMessage = err.error;
          console.log(err.error)
          this.isSignUpFailed = true;
        }
      );
    }
    }
}
