import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AmazingTimePickerModule } from 'amazing-time-picker';

//material imports
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormFieldModule} from '@angular/material/form-field';

import { TesthomeComponent } from './test/testhome/testhome.component';
import { HomeComponent } from './common/home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './registration/login/login.component';
import { RequestqueueComponent } from './admin/requestqueue/requestqueue.component';
import { AssigntaskerComponent } from './admin/requestqueue/assigntasker/assigntasker.component';
import { HttpinterceptorService } from './services/auth/httpinterceptor.service';
import { CreateComponent } from './common/create/create.component';
import { PhoneverifyComponent } from './common/create/phoneverify/phoneverify.component';
import { ManagementComponent } from './admin/management/management.component';
import { AdminviewComponent } from './admin/management/adminview/adminview.component';
import { AdminaddComponent } from './admin/management/adminadd/adminadd.component';
import { TaskerpanelComponent } from './tasker/taskerpanel/taskerpanel.component';
import { MarkcompleteComponent } from './tasker/taskerpanel/markcomplete/markcomplete.component';
import { ManagetaskersComponent } from './admin/management/managetaskers/managetaskers.component';
import { AddtaskerComponent } from './admin/management/managetaskers/addtasker/addtasker.component';
import { TrackComponent } from './common/track/track.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TesthomeComponent,
    HomeComponent,
    LoginComponent,
    RequestqueueComponent,
    AssigntaskerComponent,
    CreateComponent,
    PhoneverifyComponent,
    ManagementComponent,
    AdminviewComponent,
    AdminaddComponent,
    TaskerpanelComponent,
    MarkcompleteComponent,
    ManagetaskersComponent,
    AddtaskerComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    IvyCarouselModule,
    AmazingTimePickerModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
