import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/globalconstants/global-constants';
import { Location } from 'src/app/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  addLocation(location: Location){
    return this.httpClient.post<Location>(
      GlobalConstants.SERVER_V1_ADDRESS + 'location/add', 
      location
      ).toPromise();
  }

  getAllLocations(){
    return this.httpClient.get<Location[]>(
      GlobalConstants.SERVER_V1_ADDRESS + 'location/all'
    ).toPromise();
  }


}
