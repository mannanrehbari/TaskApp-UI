import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskerService } from 'src/app/services/admin/tasker.service';
import { AddtaskerComponent } from './addtasker/addtasker.component';

@Component({
  selector: 'app-managetaskers',
  templateUrl: './managetaskers.component.html',
  styleUrls: ['./managetaskers.component.scss']
})
export class ManagetaskersComponent implements OnInit {

  constructor(
    private taskerService: TaskerService,
    private matDlg: MatDialog
  ) { }

  ngOnInit(): void {
    const prom = this.taskerService.allTaskersNew();
    prom.then(
      (data) => {
        console.log(data);
      }
    );
  }

  addTasker(){
    const dlgRef = this.matDlg.open(AddtaskerComponent, {
      disableClose: true
    });

    dlgRef.afterClosed().subscribe();

  }



}
