import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/app/snackbar.service';

@Component({
  selector: 'app-phoneverify',
  templateUrl: './phoneverify.component.html',
  styleUrls: ['./phoneverify.component.scss']
})
export class PhoneverifyComponent implements OnInit {


  constructor(
    public dlgRef: MatDialogRef<PhoneverifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _snackBar: SnackbarService
  ) { }

  ngOnInit(): void {

  }

  cancelPhoneVer() {
    this.dlgRef.close({
    });
  }

}
