import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalconstants/global-constants';
import { ServiceType } from 'src/app/models/service-type';

@Injectable({
  providedIn: 'root'
})
export class ServicetypeService {

  constructor(private httpClient: HttpClient) { }

  getServiceTypes() {
    return this.httpClient.get<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'servicetype/all').toPromise();
  }

  addServiceType(serviceType: ServiceType){
    return this.httpClient.post<any>(
      GlobalConstants.SERVER_V1_ADDRESS + 'servicetype/add', serviceType).toPromise();
  }



}
