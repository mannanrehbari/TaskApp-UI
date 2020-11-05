import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DevicesizeService } from '../services/devicesize.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthdataService } from '../services/auth/authdata.service';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{
  
  isHandset$: any;
  loggedIn: boolean;
  username: string;
  userRole: string;
  userId: number;


  constructor(
    private deviceService: DevicesizeService,
    public loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router, 
    private authData: AuthdataService) {}
  
  ngOnInit() {
    this.isHandset$ = this.deviceService.isHandset$;
    if(localStorage.getItem('username')){
      this.username = localStorage.getItem('username');
      this.loggedIn = true;
      this.userRole = localStorage.getItem('role');
      this.userId = Number.parseInt(localStorage.getItem('userId'));      
      return;
    } 

    this.authData.currentRole.subscribe(userRole => this.userRole = userRole);
    this.authData.currentLoggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.authData.currentUsername.subscribe(username => this.username = username);
    this.authData.currentUserId.subscribe(userid => this.userId = userid);
  }

  logout() {
    localStorage.clear();

    this.authData.changeRole(null);
    this.authData.changeLoggedin(false);
    this.authData.changeUsername(null);
    this.authData.changeUserId(null);
    
    this.ngOnInit();
    this.router.navigate(['/']);
   
    this._snackBar.open('Logged out successfully', 'Dismiss', {
      duration: 3000
    })
  }
  

}
