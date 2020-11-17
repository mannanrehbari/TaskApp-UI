import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceType } from 'src/app/models/service-type';
import { Taskerdetails } from 'src/app/models/taskerdetails';
import { ServicetypeService } from 'src/app/services/admin/servicetype.service';
import { TaskerService } from 'src/app/services/admin/tasker.service';
import { AddtaskerComponent } from './addtasker/addtasker.component';

@Component({
  selector: 'app-managetaskers',
  templateUrl: './managetaskers.component.html',
  styleUrls: ['./managetaskers.component.scss']
})
export class ManagetaskersComponent implements OnInit, AfterViewInit {


  dataSource: MatTableDataSource<Taskerdetails>;
  displayedColumns: string[] = ['First Name', 
  'Last Name', 'Phone Number', 'Type', 'Actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  dataLoaded: boolean;
  typesLoaded: boolean;
  allTaskers: Taskerdetails[];
  serviceTypes: ServiceType[];

  constructor(
    private taskerService: TaskerService,
    private serviceTypeService: ServicetypeService,
    private matDlg: MatDialog
  ) { 
    this.dataSource = new MatTableDataSource();
  }


  ngOnInit(): void {
    this.typesLoaded = false;
    this.dataLoaded = false;
    const promise = this.serviceTypeService.getServiceTypes();
    promise.then(
      (data) => {
        this.typesLoaded = true;
        this.serviceTypes = data;
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

  addTasker(){
    const dlgRef = this.matDlg.open(AddtaskerComponent, {
      width: '60%',
      disableClose: true
    });

    dlgRef.afterClosed().subscribe();

  }

  fetchTaskers(){
    const promise = this.taskerService.allTaskersNew();
    promise.then(
      (data) => {
        this.dataLoaded = true;
        this.mapServiceTypeName(data);
        this.dataSource.data = data;
      }
    );

  }

  mapServiceTypeName(taskers: Taskerdetails[]){
    taskers.forEach((tasker) => {
      tasker.serviceType = this.serviceTypes[tasker.serviceTypeId - 1].serviceType;      
    });
  }



}
