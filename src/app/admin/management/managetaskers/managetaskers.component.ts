import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Taskerdetails } from 'src/app/models/taskerdetails';
import { TaskerService } from 'src/app/services/admin/tasker.service';
import { AddtaskerComponent } from './addtasker/addtasker.component';

@Component({
  selector: 'app-managetaskers',
  templateUrl: './managetaskers.component.html',
  styleUrls: ['./managetaskers.component.scss']
})
export class ManagetaskersComponent implements OnInit {


  dataLoaded: boolean;
  allTaskers: Taskerdetails[];

  constructor(
    private taskerService: TaskerService,
    private matDlg: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    const prom = this.taskerService.allTaskersNew();
    prom.then(
      (data) => {
        this.dataLoaded = true;
        this.allTaskers = data;
      }
    );
  }

  addTasker(){
    const dlgRef = this.matDlg.open(AddtaskerComponent, {
      width: '60%',
      disableClose: true
    });

    dlgRef.afterClosed().subscribe();

  }



}
