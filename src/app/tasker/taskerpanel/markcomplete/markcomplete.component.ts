import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paymentmethod } from 'src/app/enums/paymentmethod.enum';
import { Paymentinformation } from 'src/app/models/paymentinformation';
import { SnackbarService } from 'src/app/services/app/snackbar.service';
import { OpenapisService } from 'src/app/services/openapis.service';

@Component({
  selector: 'app-markcomplete',
  templateUrl: './markcomplete.component.html',
  styleUrls: ['./markcomplete.component.scss']
})
export class MarkcompleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MarkcompleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private openApis: OpenapisService,
    private _snackBarSrvc: SnackbarService
  ) { }

  paymentMethods: Array<string> = Object.keys(Paymentmethod).filter(key => isNaN(+key));
  selectedMethod: string;

  paymentInformation: Paymentinformation;

  // receipt information
  selectedFile: File;
  retrievedFile: any;
  base64Data: any;
  retrieveResponse: any;
  message: string;
  imageName: any;

  
  ngOnInit(): void {
    this.paymentInformation = new Paymentinformation();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  // when file is changed
  public onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }


  savePaymentInformation(){
    this.paymentInformation.paymentMethod = this.selectedMethod;
    // do some validation
    if(this.selectedMethod == null || this.paymentInformation.paymentAmount == null || this.paymentInformation.paymentConfirmationNo == null){
      this._snackBarSrvc.snackBar('Invalid data');
      return;
    }

    if(!this.selectedFile){
      this._snackBarSrvc.snackBar('Kindly attach a receipt');
      return;
    }

    this.paymentInformation.reqTrackingId = this.data.request.trackingId;
    this.paymentInformation.taskerId = this.data.request.assignedTaskerId;


    const uploadData = new FormData();
    uploadData.append('requestReceipt', this.selectedFile);
    uploadData.append('paymentInformation', JSON.stringify(this.paymentInformation));
    
    
    this.openApis.completeRequestPayment(uploadData).subscribe(
      (response) => {
        if (response.status === 200) {
          this.dialogRef.close();
          this._snackBarSrvc.snackBar('Payment information successfully submitted! ');
        } else {
          this._snackBarSrvc.snackBar('Not complete yet');
        }
      }
    );
  }


}
