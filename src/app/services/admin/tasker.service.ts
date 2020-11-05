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
  addTasker(authRequest: Authrequest){
    return this.http.post<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'tasker/add', authRequest 
      ).toPromise();
  }

  addTaskerV2(taskerSignup: TaskerSignup){
    return this.http.post<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'tasker/add', taskerSignup
    ).toPromise();
  }

  allTaskers(){
    return this.http.get<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'tasker/all'
    ).toPromise();
  }

  taskersByType(serviceTypeId: number){
    return this.http.get<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'tasker/type/' + serviceTypeId
    ).toPromise();
  }

}
