import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalconstants/global-constants';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(
    private http: HttpClient
  ) { }

  sendSms(phoneNumber: string) {
    return this.http.get<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'sms/sendsms/' + phoneNumber
    ).toPromise();
  }

  verifyCode(phoneNumber: string, trackingId: string) {
    return this.http.get<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'sms/verify/' + phoneNumber + '/' + trackingId
    ).toPromise();
  }

}
