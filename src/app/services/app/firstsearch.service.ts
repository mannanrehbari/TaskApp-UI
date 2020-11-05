import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Locationandtype } from 'src/app/transfer/locationandtype';

@Injectable({
  providedIn: 'root'
})
export class FirstsearchService {

  private dataSource = new BehaviorSubject(new Locationandtype());
  data = this.dataSource.asObservable();

  constructor() { }

  updatedDataSelection(data: Locationandtype){
    this.dataSource.next(data);
  }

  
}
