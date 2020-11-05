import { Component, OnInit } from '@angular/core';
import { OpenapisService } from 'src/app/services/openapis.service';
import { Servicerequest } from 'src/app/models/servicerequest';
import { MatDialog } from '@angular/material/dialog';
import { AssigntaskerComponent } from './assigntasker/assigntasker.component';
import { ServicetypeService } from 'src/app/services/admin/servicetype.service';
import { ServiceType } from 'src/app/models/service-type';
import { LocationService } from 'src/app/services/admin/location.service';
import { Location } from 'src/app/models/location';
import { RequestStatus } from 'src/app/enums/request-status.enum';
import { RequestSearchCriteria } from 'src/app/models/request-search-criteria';

@Component({
  selector: 'app-requestqueue',
  templateUrl: './requestqueue.component.html',
  styleUrls: ['./requestqueue.component.scss']
})
export class RequestqueueComponent implements OnInit {

  constructor(
    private openApis: OpenapisService,
    private serviceTypeService: ServicetypeService,
    private locationService: LocationService,
    private matDlg: MatDialog
  ) { }

  allRequests: Servicerequest[];
  displayedColumns: string[] = ['trackingId', 
  'First Name', 'Last Name',
  'serviceTypeId', 'Phone Number',
  'locationId', 'Status', 'Assigned Tasker',
  'Actions']

  // filter to search requests
  locations: Location[]
  serviceTypes: ServiceType[]
  selectedLocation: Location = new Location();
  selectedService: ServiceType = new ServiceType();

  requestStatuses : Array<string> = Object.keys(RequestStatus).filter(key => isNaN(+key));
  selectedStatus: string;

  criteria : RequestSearchCriteria = new RequestSearchCriteria() ;
  lastCriteria: RequestSearchCriteria = new RequestSearchCriteria();

  ngOnInit(): void {
    const servTypePromise = this.serviceTypeService.getServiceTypes();
    servTypePromise.then(
      (data) => {
        this.serviceTypes = data;
      }
    );
    const locationPromise = this.locationService.getAllLocations();
    locationPromise.then(
      (data) => {
        this.locations = data;
      }
    );  
  }

  assignTasker(request: any){
    const dialogRef = this.matDlg.open(AssigntaskerComponent, {
      width: "60%",
      data: {request}
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }


  fetchRequestsByCriteria(){
    this.lastCriteria.serviceType = '';
    this.lastCriteria.location = '';
   
    if( this.selectedLocation ){
      this.criteria.locationId = this.selectedLocation.id
    }
    if( this.selectedService ) {
      this.criteria.serviceTypeId = this.selectedService.id
    }
    if( this.selectedStatus ) {
      this.criteria.requestStatus = this.selectedStatus
    }

    const promise = this.openApis.getRequestsByCriteria(this.criteria);
    promise.then(
      (data) => {
        
        this.allRequests = data;
        this.selectedLocation = new Location();
        this.selectedService = new ServiceType();

        this.selectedStatus = null;
        this.lastCriteria = this.criteria;
        if(this.criteria.locationId){
          this.lastCriteria.location = this.locations.filter( element => element.id === this.criteria.locationId)[0].city;
        }
        if(this.criteria.serviceTypeId){
          this.lastCriteria.serviceType = this.serviceTypes.filter(element => element.id === this.criteria.serviceTypeId)[0].serviceType;
        }
        this.criteria = new RequestSearchCriteria();
        
        this.ngOnInit();
      }
    )
  }

}