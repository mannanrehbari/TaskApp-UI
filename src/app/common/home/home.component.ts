import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { ServiceType } from 'src/app/models/service-type';
import { LocationService } from 'src/app/services/admin/location.service';
import { ServicetypeService } from 'src/app/services/admin/servicetype.service';
import { FirstsearchService } from 'src/app/services/app/firstsearch.service';
import { SnackbarService } from 'src/app/services/app/snackbar.service';
import { DevicesizeService } from 'src/app/services/devicesize.service';
import { Locationandtype } from 'src/app/transfer/locationandtype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isHandset: boolean;
  locations: Location[];
  services: ServiceType[];
  servicesLoaded: boolean;

  selectedLocation: Location;
  selectedService: ServiceType;


  constructor(
    private dsService: DevicesizeService,
    private _snackBarService: SnackbarService,
    private locationService: LocationService,
    private serviceTypeService: ServicetypeService,
    private firstSearchService: FirstsearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dsService.isHandset$.subscribe(
      (data) => { this.isHandset = data }
    );
    const locationAndType = new Locationandtype();

    this.servicesLoaded = false;
    const locProm = this.locationService.getAllLocations();
    const srvcProm = this.serviceTypeService.getServiceTypes();
    
    locProm.then(
      (data) => {
        this.locations = data;
        locationAndType.allLocations = this.locations;
      }, (error) => {

      }
    );
    srvcProm.then(
      (data) => {
        this.services = data;
        locationAndType.allServices = this.services;
        this.servicesLoaded = true;
      }, (error) => {

      }
    );
    this.firstSearchService.updatedDataSelection(locationAndType);

  }

  navigateToCreate() {
    if (!this.selectedService || !this.selectedLocation) {
      this._snackBarService.snackBar('Please select the location and service');
      return;
    }

    const locationAndType = new Locationandtype();
    locationAndType.location = this.selectedLocation;
    locationAndType.serviceType = this.selectedService;
    locationAndType.allLocations = this.locations;
    locationAndType.allServices = this.services;

    this.firstSearchService.updatedDataSelection(locationAndType);
    this.router.navigate(['/create']);
  }

  scrollToTop(service: any) {
    window.scrollTo(
      {
        top: 0,
        behavior: 'smooth'
      }
    );
    this.selectedService = service;

  }

  linkNav(url: any){
    window.open(url, '_blank');
  }

}
