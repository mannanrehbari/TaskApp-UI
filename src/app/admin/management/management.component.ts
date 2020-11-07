import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminaddComponent } from './adminadd/adminadd.component';
import { AdminviewComponent } from './adminview/adminview.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  serviceTypeStr = 'serviceType';
  locationStr = 'location';

  constructor(
    private matDlg: MatDialog
  ) { }

  ngOnInit(): void {
  }

  adminView(adminViewType: string) {
    const dlgRef = this.matDlg.open(AdminviewComponent, {
      data: adminViewType
    });
    
    dlgRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  adminAdd(adminAddType: string) {
    const dlgRef = this.matDlg.open(AdminaddComponent, {
      data: adminAddType
    });
  }

}
