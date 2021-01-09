import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { TokenStorageService } from '../shared/token-storage.service';

@Component({
  selector: 'app-pop-up-sign-in',
  templateUrl: './pop-up-sign-in.component.html',
  styleUrls: ['./pop-up-sign-in.component.css']
})
export class PopUpSignInComponent implements OnInit {

  @Input() showSignIn: boolean
  loginForm: FormGroup
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: any;

  constructor(private popUpIn: HeaderComponent, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  goBack(): void {
    this.popUpIn.showIn()
  }

  handleClick(event) {
    event.stopPropagation();
  }

  onSubmit() {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .subscribe(
      data => {
        this.tokenStorage.saveToken(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    )
  }
  reloadPage(): void {
    window.location.reload();
  }
}
