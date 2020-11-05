import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstants } from 'src/app/globalconstants/global-constants';
import { Authrequest } from 'src/app/models/authrequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedInEvent = new EventEmitter();


  userRole: string;

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }


  loginUser(authRequest: Authrequest) {
    return this.httpClient.post<any>(
      GlobalConstants.SERVER_ADDRESS + GlobalConstants.API_PREFIX + 'auth/login',
      authRequest).toPromise();
  }
}
