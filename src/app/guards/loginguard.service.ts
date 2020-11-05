import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginguardService implements CanActivate{

  constructor(private router: Router,
    private _snackBar: MatSnackBar) { }

  canActivate(): boolean {

    if(localStorage.getItem('username') != null){
      return true;
    }
    this._snackBar.open('Log in to access your request history!', 'Dismiss', {
      duration: 4000
    });
    this.router.navigate(['/']);    
    return false;
  }
}
