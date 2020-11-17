import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestStatus } from 'src/app/enums/request-status.enum';
import { SnackbarService } from 'src/app/services/app/snackbar.service';
import { OpenapisService } from 'src/app/services/openapis.service';
import { SmsService } from 'src/app/services/sms/sms.service';

@Component({
  selector: 'app-phoneverify',
  templateUrl: './phoneverify.component.html',
  styleUrls: ['./phoneverify.component.scss']
})
export class PhoneverifyComponent implements OnInit {


  phoneNumber: string;
  trackingIdInput: string;

  codeSent: boolean;
  trackingIdVerified: boolean;


  constructor(
    public dlgRef: MatDialogRef<PhoneverifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public openApis: OpenapisService,
    public _snackBar: SnackbarService,
    public smsService: SmsService
  ) { }

  ngOnInit(): void {
    this.codeSent = false;
  }

  validatePhoneNumber() {
    if (!this.phoneNumber || isNaN(Number(this.phoneNumber))) {
      this._snackBar.snackBar('Not a valid number!');
      return;
    }
    if (this.phoneNumber.length != 11) {
      this._snackBar.snackBar('Recheck your phone number!');
      return;
    }
    // send code
    const promise = this.smsService.sendSms(this.phoneNumber);
    promise.then(
      (data) => {
        if(data.status == 'LIMIT_EXCEEDED'){
          this._snackBar.snackBar(data.message);
        } else if (data.status == 'SUCCESSFUL') {
          this.codeSent = true;
        }
        
      }, (error) => {
        this._snackBar.snackBar('error');
      }
    );
  }

  verifyTrackingCode() {

    // api will send trackingId
    const prom = this.smsService.verifyCode(this.phoneNumber, this.trackingIdInput);
    prom.then(
      (data) => {
        if(data.status == 'INCORRECT'){
          this._snackBar.snackBar(data.message);
        } else if (data.status == 'SUCCESSFUL'){
          this.addRequest();
        }
      }, (error) => {
        this._snackBar.snackBar('Unknown error');
      }
    );

  }

  addRequest() {
    this.data.trackingId = this.trackingIdInput;
    this.data.seekerPhone = this.phoneNumber;
    this.data.requestStatus = RequestStatus[RequestStatus.STARTED];

    if (localStorage.getItem('username')) {
      this.data.seekerEmail = localStorage.getItem('username');
    }
    const promise = this.openApis.addRequest(this.data);
    promise.then(
      (data) => {
        const trackingId = data.trackingId
        this.dlgRef.close({ trackingId: trackingId });
        this._snackBar.snackBar('Request added successfully');
      }, (error) => {
        this._snackBar.snackBar('error');
      }
    );
  }




  cancelPhoneVer() {
    this.dlgRef.close({
    });
  }

}
