import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalconstants/global-constants';
import { Authrequest } from 'src/app/models/authrequest';
import { TaskerSignup } from 'src/app/models/tasker-signup';

@Injectable({
  providedIn: 'root'
})
export class TaskerService {

  constructor(private http: HttpClient) { }


  addTaskerV2(taskerSignup: TaskerSignup){
    return this.http.post<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'tasker/add', taskerSignup
    ).toPromise();
  }

  // use the following
  addTaskerNew(uploadData: any){
    return this.http.post(
      GlobalConstants.SERVER_V1_ADDRESS + 'tasker/add-new', 
      uploadData
    );
  }

  taskersByType(serviceTypeId: number){
    return this.http.get<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'tasker/type/' + serviceTypeId
    ).toPromise();
  }

  // new apis
  allTaskersNew(){
    return this.http.get<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'tasker/all-taskers'
    ).toPromise();
  }
  


}
