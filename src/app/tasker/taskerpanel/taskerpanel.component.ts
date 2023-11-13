import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { Servicerequest } from 'src/app/models/servicerequest';
import { SnackbarService } from 'src/app/services/app/snackbar.service';
import { DevicesizeService } from 'src/app/services/devicesize.service';
import { OpenapisService } from 'src/app/services/openapis.service';
import { MarkcompleteComponent } from './markcomplete/markcomplete.component';

@Component({
  selector: 'app-taskerpanel',
  templateUrl: './taskerpanel.component.html',
  styleUrls: ['./taskerpanel.component.scss']
})
export class TaskerpanelComponent implements OnInit, AfterViewInit {

  taskerId: number;
  isHandset: boolean;

  allRequests: Servicerequest[];
  assignedRequests: Servicerequest[];
  acceptedRequests: Servicerequest[];
  completedRequests: Servicerequest[];

  dataLoaded = false;

  assignedColumns: string[] = ['First Name', 'Last Name',
  'Phone Number','locationId', 'Status',
  'Assigned Time','Actions']

  acceptedColumns: string[] = ['trackingId', 'First Name', 'Last Name',
  'serviceTypeId', 'Phone Number','locationId', 'Status','Actions']

  completedColumns: string[] = ['trackingId', 'First Name', 'Last Name',
  'serviceTypeId', 'Phone Number','locationId', 'Status']

  completedDataSource : MatTableDataSource<Servicerequest>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['First Name', 'Last Name', 'Request Date']

  constructor(
    private openApis: OpenapisService,
    private snackBarService: SnackbarService,
    private matDlg: MatDialog,
    private deviceSizeService: DevicesizeService
  ) { 
    this.completedDataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.completedDataSource.paginator = this.paginator;
    this.completedDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.deviceSizeService.isHandset$.subscribe(
      (data) => {this.isHandset = data}
    );
    this.allRequests = new Array<Servicerequest>();
    this.assignedRequests = new Array<Servicerequest>();
    this.acceptedRequests = new Array<Servicerequest>();
    this.completedRequests = new Array<Servicerequest>();

    this.dataLoaded = false;
    this.taskerId = Number.parseFloat(localStorage.getItem('userId'));
    const promise = this.openApis.getRequestsByTasker(this.taskerId);
    promise.then(
      (data) => {
        this.allRequests = data;
        this.splitRequestsByStatus(this.allRequests);;
        this.dataLoaded = true;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.completedDataSource.filter = filterValue.trim().toLowerCase();

    if (this.completedDataSource.paginator) {
      this.completedDataSource.paginator.firstPage();
    }
  }

  splitRequestsByStatus(serviceReqs: Servicerequest[]){
    this.acceptedRequests = [];
    this.assignedRequests = [];
    serviceReqs.forEach(
      (req) => {
        if(req.requestStatus == "IN_PROGRESS"){
          this.acceptedRequests.push(req);
        } else if (req.requestStatus == "ASSIGNED") {    
          var timeTemp = new Date(req.assignedTime); 

          req.assignedTimeDisplay = timeTemp.getHours() + ':' + timeTemp.getMinutes(); 
          this.assignedRequests.push(req);
        } else if (req.requestStatus == "COMPLETED") {
          this.completedRequests.push(req);
        }
      }
    );
    this.completedDataSource.data = this.completedRequests;
    
  }

  acceptServiceRequest(request: Servicerequest){
    const promise = this.openApis.acceptTaskerRequest(request);
    promise.then(
      (data) => {
        this.snackBarService.snackBar('Task accepted!')
      }
    ).finally(
      () => {
        this.ngOnInit();
      }
    );
  }

  cancelServiceRequest(request: Servicerequest){
    const promise = this.openApis.cancelTaskerRequest(request);
    promise.then(
      (data) => {
        this.snackBarService.snackBar('Task cancelled')
      }
    ).finally(
      () => {
        this.ngOnInit();
      }
    );
  }

  markComplete (request: Servicerequest) {
    const dlgRef = this.matDlg.open(MarkcompleteComponent, {
      data: {request},
      disableClose: true
    });

    dlgRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });

  }

}
