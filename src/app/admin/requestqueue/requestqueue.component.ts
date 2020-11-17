import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SnackbarService } from 'src/app/services/app/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-requestqueue',
  templateUrl: './requestqueue.component.html',
  styleUrls: ['./requestqueue.component.scss']
})
export class RequestqueueComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Servicerequest>;
  displayedColumns: string[] = ['trackingId', 
  'First Name', 'Last Name',
  'serviceTypeId', 'Phone Number',
  'locationId', 'Status', 'Assigned Tasker',
  'Actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  allRequests: Servicerequest[];
  // filter to search requests
  locations: Location[]
  serviceTypes: ServiceType[]
  requestStatuses : Array<string> = Object.keys(RequestStatus).filter(key => isNaN(+key));
  
  minDate: Date;
  maxDate: Date;
  selectedLocation: Location = new Location();
  selectedService: ServiceType = new ServiceType();
  selectedStatus: string;

  criteria : RequestSearchCriteria ;
  dataFetched: boolean;

  constructor(
    private openApis: OpenapisService,
    private serviceTypeService: ServicetypeService,
    private locationService: LocationService,
    private matDlg: MatDialog,
    private _snackBarSrvc: SnackbarService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.criteria = new RequestSearchCriteria();
    this.dataFetched = false;
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
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  assignTasker(request: any){
    const dialogRef = this.matDlg.open(AssigntaskerComponent, {
      data: {request}
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  minDateChange(event: MatDatepickerInputEvent<Date>) {
    this.minDate = event.value;
  }
  maxDateChange(event: MatDatepickerInputEvent<Date>) {
    this.maxDate = event.value;
  }


  fetchRequestsByCriteria(){
    if(!this.validateSearchCriteria()) {
      return;
    }
    this.criteria.minDate = this.minDate;
    this.criteria.maxDate = this.maxDate;
    this.additionalValidation();
    this.openApis.getRequestsByCriteria(this.criteria).then(
      (data) => {
        this.dataFetched = true;
        this.dataSource.data = data;
        this.criteria = new RequestSearchCriteria();
      }
    );
  }

  validateSearchCriteria(){
    if(!this.maxDate || !this.minDate) {
      this._snackBarSrvc.snackBar('Please select the dates');
      return false;
    } else {
      return true;
    }
  }
  additionalValidation(){
    if(this.selectedService) {
      this.criteria.serviceTypeId = this.selectedService.id;
    }
    if(this.selectedLocation) {
      this.criteria.locationId = this.selectedLocation.id;
    }
    if(this.selectedStatus) {
      this.criteria.requestStatus = this.selectedStatus;
    }
  }

}