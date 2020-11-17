import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Servicerequest } from 'src/app/models/servicerequest';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private dataSource = new BehaviorSubject(new Servicerequest());
  request = this.dataSource.asObservable();

  constructor() { }

  updatedRequest(request: Servicerequest){
    this.dataSource.next(request);
  }


}
