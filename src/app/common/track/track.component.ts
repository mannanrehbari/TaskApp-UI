import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Servicerequest } from 'src/app/models/servicerequest';
import { OpenapisService } from 'src/app/services/openapis.service';
import { jsPDF} from 'jspdf';
import { DatePipe } from '@angular/common';
import { Paymentinformation } from 'src/app/models/paymentinformation';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;

  request: Servicerequest;
  paymentInfo: Paymentinformation;
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

  public openPDF() {
    if(this.request.requestStatus != 'COMPLETED') {
      return;
    }
    const promise = this.openApis.getPaymentInfo(this.request.trackingId);
    promise.then(
      (data) => {
        this.paymentInfo = data;
        this.createPDF();
      }, (error) => {
      }
    );
    
  }

  createPDF(){
    let doc = new jsPDF();
    // doc.setTextColor('#ffa726');
    // doc.text('IWORK.PK', 30, 30);
    var logo = new Image();
    logo.src= 'assets/logo.png';
    doc.addImage(logo, 'png', 30, 20, 50, 17);
    
    doc.setTextColor('#000000');
    doc.setFontSize(13);
    var pipe = new DatePipe('en-US');
    var date = Date.now();
    doc.text(pipe.transform(date, 'fullDate'), 130, 30);

    doc.setFontSize(25);
    console.log(doc.getFontList())
    doc.setFont('helvetica', '', 'bold' );
    doc.text('Thanks for using IWORK,', 30, 60);
    doc.text(this.request.firstName, 30, 70);

    doc.setFontSize(15);
    doc.text('Ticket Number', 30, 100);
    doc.text(this.paymentInfo.reqTrackingId, 140, 100);

    doc.line(30, 120, 185, 120);

    doc.setFontSize(15);
    
    doc.text('Task Charges', 30, 140);
    doc.text(this.paymentInfo.serviceCharges.toString(), 140, 140);

    doc.text('Other Charges', 30, 155);
    doc.text(this.paymentInfo.otherCharges.toString(), 140, 155);

    doc.setFontSize(20)
    doc.line(30, 170, 185, 170);
    doc.text('Total Charges', 30, 180);
    doc.text(this.paymentInfo.totalCharges.toString(), 140, 180);


    doc.setFontSize(10);
    doc.text('*Tax is included in the charges', 30, 195);

    // console.log(this.request.requestStatus);
    
    var receiptName =  'receipt-iwork-' + pipe.transform(date, 'MM-dd') + '';
    doc.save( receiptName + '.pdf');

  }




}
