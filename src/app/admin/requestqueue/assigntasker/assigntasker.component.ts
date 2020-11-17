import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicerequest } from 'src/app/models/servicerequest';
import { Taskermodel } from 'src/app/models/taskermodel';
import { TaskerService } from 'src/app/services/admin/tasker.service';
import { OpenapisService } from 'src/app/services/openapis.service';

@Component({
  selector: 'app-assigntasker',
  templateUrl: './assigntasker.component.html',
  styleUrls: ['./assigntasker.component.scss']
})
export class AssigntaskerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AssigntaskerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskerService: TaskerService,
    private openApis: OpenapisService

  ) { }

  serviceRequest: Servicerequest
  taskerList: Taskermodel[]

  //service call finished
  taskersFetched: Boolean = false;
  alreadyAssigned: Boolean;


  ngOnInit(): void {

    this.serviceRequest = this.data.request
    if (this.serviceRequest.assignedTaskerId) {
      this.alreadyAssigned = true;
    } else {
      this.alreadyAssigned = false;

    }
    const taskersOfType = this.taskerService.taskersByType(this.serviceRequest.serviceTypeId);
    taskersOfType.then(
      (data) => {
        this.taskerList = data;
        this.taskersFetched = true;
      }
    );
  }

  assignTasker(taskerId: number) {
    // do api call
    
    const promise = this.openApis.assignTasker(taskerId, this.serviceRequest);
    promise.then(
      (data) => {
        this.alreadyAssigned = true;
        this.ngOnInit();
      }
    );
  }
  unassignTasker() {
    // do api call  
    const promise = this.openApis.unassignTasker(this.serviceRequest);
    promise.then(
      (data) => {
        this.alreadyAssigned = false;
        this.serviceRequest.assignedTaskerId = null;
        this.ngOnInit();
      }
    );
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
