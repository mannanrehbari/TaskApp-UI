import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../globalconstants/global-constants';
import { EmailRequest } from '../models/emailrequest';
import { Servicerequest } from '../models/servicerequest';
import { Requestcomplete } from '../transfer/requestcomplete';

@Injectable({
  providedIn: 'root'
})
export class OpenapisService {

  constructor(
    private http: HttpClient
  ) { }

  addRequest(serviceRequest: Servicerequest) {
    return this.http.post<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/add', serviceRequest
    ).toPromise();
  }

  trackRequest(trackingId: string) {
    return this.http.get<Servicerequest>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/track/' + trackingId
    ).toPromise();
  }

  assignTasker(taskerId: any, serviceRequest: Servicerequest) {
    serviceRequest.assignedTaskerId = taskerId;
    return this.http.post<Servicerequest>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/assign', serviceRequest
    ).toPromise();
  }

  unassignTasker(serviceRequest: Servicerequest) {
    return this.http.post<Servicerequest>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/unassign', serviceRequest
    ).toPromise();
  }

  getAllRequests() {
    return this.http.get<Servicerequest[]>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/all'
    ).toPromise();
  }

  getRequestsByCriteria(criteria: any) {
    return this.http.post<Servicerequest[]>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/search-criteria', criteria
    ).toPromise();
  }

  getRequestsByTasker(taskerId: number) {
    return this.http.get<Servicerequest[]>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/tasker/' + taskerId
    ).toPromise();
  }

  acceptTaskerRequest(serviceRequest: Servicerequest) {
    return this.http.post<Servicerequest>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/accept', serviceRequest
    ).toPromise();
  }
  cancelTaskerRequest(serviceRequest: Servicerequest) {
    return this.http.post<Servicerequest>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/cancel', serviceRequest
    ).toPromise();
  }

  completeRequest(requestComplete: Requestcomplete) {
    return this.http.post<Servicerequest>(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/complete', requestComplete
    ).toPromise();
  }

  completeRequestPayment(uploadData: any) {
    return this.http.post(
      GlobalConstants.SERVER_V1_ADDRESS + 'request/complete-payment',
      uploadData,
      { observe: 'response' }
    );
  }





  emailVerification(email: string) {
    const emailReq: EmailRequest = new EmailRequest();
    emailReq.email = email;
    return this.http.post<string>(
      GlobalConstants.SERVER_V1_ADDRESS + 'password/sendcode', emailReq
    ).toPromise();
  }
}
