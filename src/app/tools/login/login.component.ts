import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorData } from '../error/error-data';
import { SpinnerData } from '../spinner/spinner-data';
import { AuthOptions } from '../auth/auth-options';
import { AuthService, LoginRequest, LoginResponse } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private _username: FormControl = new FormControl('', [Validators.required]);
  private _password: FormControl = new FormControl('', [Validators.required]);

  public loginForm: FormGroup;
  public spinner: SpinnerData = new SpinnerData();
  public error: ErrorData = new ErrorData();

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authOptions: AuthOptions,
    private _authService: AuthService,
  ) {
    this.loginForm = this._formBuilder.group({
      username: this._username,
      password: this._password,
    });
  }

  onSubmit(): void {
    const loginRequest: LoginRequest = new LoginRequest(
      this._username.value as string,
      this._password.value as string,
    );
    this.spinner.inc();
    this._authService.login(loginRequest)
      .subscribe((response: LoginResponse) => {
        this.spinner.dec();
        let url: string = this._authOptions.homeUrl;
        if (this._route.snapshot.paramMap.has('returnUrl')) {
          url = this._route.snapshot.paramMap.get('returnUrl');
        }
        this._router.navigateByUrl(url);
      }, (err: any) => {
        this.spinner.dec();
        this.error.addError(err);
      });
  }
}
