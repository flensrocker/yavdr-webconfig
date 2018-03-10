import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { ErrorData } from '../error/error-data';
import { SpinnerData } from '../spinner/spinner-data';
import { AuthService, LoginRequest, LoginResponse } from '../auth/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  private _username: FormControl = new FormControl('', [Validators.required]);
  private _password: FormControl = new FormControl('', [Validators.required]);

  public loginForm: FormGroup;
  public spinner: SpinnerData = new SpinnerData();
  public error: ErrorData = new ErrorData();

  constructor(
    private _dialogRef: MatDialogRef<LoginModalComponent>,
    private _formBuilder: FormBuilder,
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
        this._dialogRef.close();
      }, (err: any) => {
        this.spinner.dec();
        this.error.addError(err);
      });
  }
}
