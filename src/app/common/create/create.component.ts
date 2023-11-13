import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { RequestStatus } from 'src/app/enums/request-status.enum';
import { Location } from 'src/app/models/location';
import { ServiceType } from 'src/app/models/service-type';
import { Servicerequest } from 'src/app/models/servicerequest';
import { FirstsearchService } from 'src/app/services/app/firstsearch.service';
import { SnackbarService } from 'src/app/services/app/snackbar.service';
import { TrackingService } from 'src/app/services/app/tracking.service';
import { DevicesizeService } from 'src/app/services/devicesize.service';
import { PhoneverifyComponent } from './phoneverify/phoneverify.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  isHandset: boolean;
  locations: Location[]
  serviceTypes: ServiceType[]

  selectedLocation: Location;
  selectedService: ServiceType;

  serviceRequest: Servicerequest;

  // pieces of request
  firstName: string;
  lastName: string = null;
  seekerEmail: string;
  seekerPhone: string;
  address: string;
  details: string;
  serviceTypeId: number;
  locationId: number;
  requestStatus: RequestStatus
  requestDate: Date;
  requestTime: String;

  minDate: Date;
  maxDate: Date;

  isEditable: boolean = true;
  allFieldsValid: boolean;
  dateSelected: boolean;
  isLinear = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private dsService: DevicesizeService,
    private firstSearchService: FirstsearchService,
    private timePicker: AmazingTimePickerService,
    private trackingService: TrackingService,
    private router: Router,
    public phoneVerDlg: MatDialog,
    private _snackBarService: SnackbarService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      requestDate: ['', Validators.required],
      requestTime: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      details: ['', Validators.required]
    });
    

    this.dateSelected = false;
    this.minDate = new Date();
    this.maxDate = this.getMaxDate();
    this.serviceRequest = new Servicerequest();
    this.dsService.isHandset$.subscribe(
      (data) => { this.isHandset = data }
    );
    this.allFieldsValid = true;
    this.firstSearchService.data.subscribe(
      (data) => {
        if (!data.location || !data.serviceType) {
          this.router.navigate(['/']);
        }
        this.selectedLocation = data.location;
        this.selectedService = data.serviceType;
      }
    );
  }

  openTimePicker() {
    if (!this.dateSelected) {
      this._snackBarService.snackBar('Select a date first');
      return;
    }
    const requestTimePicker = this.timePicker.open();
    requestTimePicker.afterClose().subscribe(
      (requestedTime) => {
        // this.requestTime = requestedTime;
        this.firstFormGroup.patchValue({requestTime : requestedTime});
      }, (error) => {
      }
    );
  }

  dateChange(event: MatDatepickerInputEvent<Date>) {
    this.requestTime = '';
    this.requestDate = event.value;
    this.dateSelected = true;
  }

  getMaxDate(): any {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDate() + 7;
    return new Date(year, month, day);
  }


  validations() {
      this.populateRequestObject();
      this.openDialog();
  }

  openDialog() {
    const dlgRef = this.phoneVerDlg.open(PhoneverifyComponent, {
      disableClose: true,
      data: this.serviceRequest
    });

    dlgRef.afterClosed().subscribe(
      (data) => {
        if(data.trackingId != "") {
          this.router.navigate(['/track', data.trackingId]);
        }
      }, (error) => {
        this._snackBarService.snackBar(error);
      }
    );
  }


  populateRequestObject() {
    this.serviceRequest.firstName = this.secondFormGroup.get('firstName').value;
    this.serviceRequest.lastName = this.secondFormGroup.get('lastName').value;
    this.serviceRequest.address = this.secondFormGroup.get('address').value;
    this.serviceRequest.seekerEmail = this.secondFormGroup.get('email').value;
    
    this.serviceRequest.details = this.thirdFormGroup.get('details').value;

    this.serviceRequest.locationId = this.selectedLocation.id;
    this.serviceRequest.serviceTypeId = this.selectedService.id;

    this.serviceRequest.requestDate = this.firstFormGroup.get('requestDate').value;
    

  }



}
