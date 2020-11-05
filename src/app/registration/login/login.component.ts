import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Authrequest } from 'src/app/models/authrequest';
import { AuthdataService } from 'src/app/services/auth/authdata.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { RegisterService } from 'src/app/services/auth/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedInEvent = new EventEmitter();

  registerForm: FormGroup;
  regSubmitted = false;

  // login
  loginForm: FormGroup;
  loginSubmitted = false;
  userRole: string;
  username: string;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authData: AuthdataService
  ) {
    this.loginService.loggedInEvent.subscribe(
      () => {
        
        this.router.navigate(['/']);
      }
    );
  }

  ngOnInit(): void {
    this.authData.currentRole.subscribe( userRole => this.userRole = userRole);

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  submitReg(tabGroup: any) {
    this.regSubmitted = true;
    const authrequest: Authrequest = new Authrequest;
    authrequest.email = this.registerForm.get('email').value;
    authrequest.password = this.registerForm.get('password').value;
    if (this.registerForm.invalid || authrequest.email == '' || authrequest.password == '') {
      this._snackBar.open('Invalid Data', 'Try again!', {
        duration: 3000,
      });
      return;
    }

    const promise = this.registerService.registerUser(authrequest);
    promise.then(
      (data) => {
        this._snackBar.open(data.message, 'Close', {
          duration: 3000,
        });
        this.registerForm.reset();
        Object.keys(this.registerForm.controls).forEach((key) => {
          this.registerForm.get(key).setErrors(null);
        });
        tabGroup.selectedIndex = 0;
      },
      (error) => {
        this._snackBar.open(error.error.message, 'Close', {
          duration: 3000,
        });
      }
    );
    this.loginSubmitted = false;

  }

  submitLogin() {
    const authrequest: Authrequest = new Authrequest;
    authrequest.email = this.loginForm.get('email').value;
    authrequest.password = this.loginForm.get('password').value;
    this.loginSubmitted = true;
    if (this.loginForm.invalid || authrequest.password == '' || authrequest.email == '') {
      this._snackBar.open('Invalid Data', 'Try again!', {
        duration: 3000,
      });
      return;
    }
    const promise = this.loginService.loginUser(authrequest);
    promise.then(
      (data) => {
        
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.email);
        this.username = data.email;
        let jwtToken = 'Bearer ' + data.accessToken;
        localStorage.setItem('token', jwtToken);
        data.roles;

        if (data.roles.includes("ROLE_ADMIN")) {
          this.userRole = "ROLE_ADMIN";
        } else if (data.roles.includes('ROLE_TASKER')) {
          this.userRole = "ROLE_TASKER";
        } else if (data.roles.includes('ROLE_SEEKER')) {
          this.userRole = "ROLE_SEEKER";
        }
        localStorage.setItem('role', this.userRole);

        this.authData.changeRole(this.userRole);
        this.authData.changeLoggedin(true);
        this.authData.changeUsername(this.username);
        this.authData.changeUserId(data.id);

        this.router.navigate(['/']);
        this.loggedInEvent.emit();
        this._snackBar.open('Logged in', 'Close', {
          duration: 3000
        });

      },
      (error) => {
        this._snackBar.open( error.error.Denied , 'Dismiss',{
          duration: 3000
        })
      }
    );



  }





  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get g() { return this.loginForm.controls; }



}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.MustMatch) {
      //return if another validator has already found an error on the matching control
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }

}
