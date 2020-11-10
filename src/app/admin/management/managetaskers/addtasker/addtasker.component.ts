import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceType } from 'src/app/models/service-type';
import { MustMatch } from 'src/app/registration/login/login.component';
import { ServicetypeService } from 'src/app/services/admin/servicetype.service';
import { TaskerService } from 'src/app/services/admin/tasker.service';
import { SnackbarService } from 'src/app/services/app/snackbar.service';

@Component({
  selector: 'app-addtasker',
  templateUrl: './addtasker.component.html',
  styleUrls: ['./addtasker.component.scss']
})
export class AddtaskerComponent implements OnInit {

  registerForm: FormGroup;
  regSubmitted = false;
  serviceTypes: ServiceType[];
  selectedService: ServiceType

  constructor(
    public dlgRef: MatDialogRef<AddtaskerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private taskerService: TaskerService,
    private snackBar: SnackbarService,
    private srvcTypService: ServicetypeService
  ) { }

  ngOnInit(): void {
    this.selectedService = new ServiceType();
    const promise = this.srvcTypService.getServiceTypes();
    promise.then(
      (data) => {
        this.serviceTypes = data;
        console.log(this.serviceTypes)
      }
    );

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  closeDlg(){
    this.dlgRef.close();    
  }

  registerTasker(){
    console.log('clicked')
  }

  get f() { return this.registerForm.controls; }

}
