import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DevicesizeService } from 'src/app/services/devicesize.service';

@Component({
  selector: 'app-testhome',
  templateUrl: './testhome.component.html',
  styleUrls: ['./testhome.component.scss']
})
export class TesthomeComponent implements OnInit {

  isHandset$: any;

  constructor(private dsService: DevicesizeService) { }

  ngOnInit(): void {
    this.isHandset$ = this.dsService.isHandset$;
  }

}
