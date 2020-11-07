import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from 'src/app/models/location';
import { ServiceType } from 'src/app/models/service-type';
import { LocationService } from 'src/app/services/admin/location.service';
import { ServicetypeService } from 'src/app/services/admin/servicetype.service';
import { SnackbarService } from 'src/app/services/app/snackbar.service';
import { AdminviewComponent } from '../adminview/adminview.component';

@Component({
  selector: 'app-adminadd',
  templateUrl: './adminadd.component.html',
  styleUrls: ['./adminadd.component.scss']
})
export class AdminaddComponent implements OnInit {

  serviceTypeStr = 'serviceType';
  locationStr = 'location';

  srvcView: boolean;
  locationView: boolean;

  serviceTypeInput: string;

  addLocForm: FormGroup;
  submitted: boolean;


  constructor(
    public dlgRef: MatDialogRef<AdminviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: SnackbarService,
    private locationService: LocationService,
    private serviceTypeService: ServicetypeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.locationView = false;
    this.srvcView = false;
    if (this.data == this.serviceTypeStr) {
      this.srvcView = true;
    } else if (this.data == this.locationStr) {
      this.locationView = true;
      this.submitted = false;
      this.addLocForm = this.formBuilder.group({
        city: ['', Validators.required],
        province: ['', Validators.required],
        country: ['', Validators.required]
      });
    }
  }


  onCancel() {
    this.dlgRef.close();
  }

  saveServiceType() {
    if (this.serviceTypeInput) {
      const newServiceType: ServiceType = new ServiceType();
      newServiceType.serviceType = this.serviceTypeInput
      const promise = this.serviceTypeService.addServiceType(newServiceType);
      promise.then((data) => {
        if (data.id == null) {
          this._snackBar.snackBar('Type already exists');
        } else {
          this._snackBar.snackBar(data.serviceType + ' updated!')
        }
      });
      this.dlgRef.close();
    } else {
      this._snackBar.snackBar('Cannot add empty');
    }


  }

  onSubmit(){
    this.submitted = true;
    //check validation
    if(
      this.addLocForm.controls.city.errors ||
      this.addLocForm.controls.province.errors ||
      this.addLocForm.controls.country.errors
      ){
        
        this._snackBar.snackBar('Errors in form');
        return;
    }
    //no validation errors, call API
    const location: Location = new Location();
    location.city = this.addLocForm.controls.city.value;
    location.province = this.addLocForm.controls.province.value;
    location.country = this.addLocForm.controls.country.value;
    
    const promise = this.locationService.addLocation(location);
    promise.then(
      (data) => {
      this._snackBar.snackBar('New location updated!');
    }, (error) => {}
    );

    // reset
    this.submitted = false;
    this.addLocForm.reset();
    this.dlgRef.close();
  }

  // convenience method for error checks
  get g() { return this.addLocForm.controls; }
}
