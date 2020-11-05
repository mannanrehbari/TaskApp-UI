import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate {

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
    ) { }

  canActivate(): boolean {
    if(localStorage.getItem('role') === 'ROLE_ADMIN'){    
      return true;
    }
    this._snackBar.open('Denied: Unauthorized!', 'Dismiss', {
      duration: 3000
    });
    this.router.navigate(['/']);
    return false;

  }
}
