import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalconstants/global-constants';
import { Authrequest } from 'src/app/models/authrequest';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient
  ) { }

  registerUser(authRequest: Authrequest){
    return this.httpClient.post<any>(
      GlobalConstants.SERVER_ADDRESS + GlobalConstants.API_PREFIX + 'auth/signup',
      authRequest).toPromise();
  }
}
