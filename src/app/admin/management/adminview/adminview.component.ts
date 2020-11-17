import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from 'src/app/models/location';
import { ServiceType } from 'src/app/models/service-type';
import { LocationService } from 'src/app/services/admin/location.service';
import { ServicetypeService } from 'src/app/services/admin/servicetype.service';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.scss']
})
export class AdminviewComponent implements OnInit {

  serviceTypeStr = 'serviceType';
  locationStr = 'location';

  srvcView: boolean;
  locationView: boolean;

  locations: Location[]
  serviceTypes: ServiceType[];

  constructor(
    public dlgRef: MatDialogRef<AdminviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationService: LocationService,
    private serviceTypeService: ServicetypeService
  ) { }


  ngOnInit(): void {
    this.locationView = false;
    this.srvcView = false;
    if(this.data == this.serviceTypeStr) {
      this.loadServices();
    } else if (this.data == this.locationStr) {
      this.loadLocations();
    }
  }

  loadLocations(){
    const promise = this.locationService.getAllLocations();
    promise.then(
      (data) => {
        this.locations = data;
        this.locationView = true;
      }, () => {}
    );
  }

  loadServices(){
    const promise = this.serviceTypeService.getServiceTypes();
    promise.then(
      (data) => {
        this.serviceTypes = data;
        this.srvcView = true;
      }, () => {}
    );
  }


}
