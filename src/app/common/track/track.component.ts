import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Servicerequest } from 'src/app/models/servicerequest';
import { OpenapisService } from 'src/app/services/openapis.service';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {


  request: Servicerequest;
  trackingId: string;

  

  isActivated: boolean;
  dataFetched: boolean = false;
  panelOpenState = false;

  constructor(
    private route: ActivatedRoute,
    private openApis: OpenapisService      
  ) { }

  ngOnInit(): void {
    this.dataFetched = false;
    this.trackingId = this.route.snapshot.paramMap.get('trackingId');
    if(!this.trackingId) {
      this.isActivated = false;
    } else {
      this.isActivated = true;
      this.loadRequest(this.trackingId);
    }
  }

  loadRequest(trackingId: any){
    const promise = this.openApis.trackRequest(this.trackingId);
    promise.then(
      (data) => {
        this.request = data;
        this.dataFetched = true;
      }
    );
  }




}
