import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceType } from 'src/app/models/service-type';
import { TaskerSignup } from 'src/app/models/tasker-signup';
import { Taskerdetails } from 'src/app/models/taskerdetails';
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
  selectedService: ServiceType = new ServiceType();
  selectedFile: File;

  taskerDetails: Taskerdetails;

  constructor(
    public dlgRef: MatDialogRef<AddtaskerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private taskerService: TaskerService,
    private snackBar: SnackbarService,
    private srvcTypService: ServicetypeService
  ) { }

  ngOnInit(): void {
    this.taskerDetails = new Taskerdetails();
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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cnicNo: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }

  closeDlg(){
    this.dlgRef.close();    
  }

  registerTasker(){
    this.regSubmitted = true;
    if(!this.registerForm.valid || !this.selectedService.id ){
      this.snackBar.snackBar('Form is invalid');
      return;
    }

    if(!this.selectedFile){
      this.snackBar.snackBar('Kindly attach a CNIC copy');
      return;
    }
    
    console.log(this.selectedService);

    const taskerSignUp: TaskerSignup = new TaskerSignup();
    taskerSignUp.email = this.registerForm.get('email').value;
    taskerSignUp.password = this.registerForm.get('password').value;
    taskerSignUp.serviceTypeId = this.selectedService.id;

    const taskerDetails: Taskerdetails = new Taskerdetails();
    taskerDetails.cnicNo = this.registerForm.get('cnicNo').value;
    taskerDetails.email = this.registerForm.get('email').value;
    taskerDetails.serviceTypeId = this.selectedService.id;
    taskerDetails.firstName = this.registerForm.get('firstName').value;
    taskerDetails.lastName = this.registerForm.get('lastName').value;
    taskerDetails.phoneNo = this.registerForm.get('phoneNo').value;

    const uploadData = new FormData();
    uploadData.append('cnicImg', this.selectedFile);

    uploadData.append('taskerRequest', JSON.stringify(taskerSignUp));
    uploadData.append('taskerDetails', JSON.stringify(taskerDetails));

    this.taskerService.addTaskerNew(uploadData).subscribe(
      (data) => {
        console.log(data)
        this.dlgRef.close();
      }, (error) => {
        console.log(error)
      }
    );
    
  }

  get f() { return this.registerForm.controls; }

}
