import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './admin/management/management.component';
import { ManagetaskersComponent } from './admin/management/managetaskers/managetaskers.component';
import { RequestqueueComponent } from './admin/requestqueue/requestqueue.component';
import { CreateComponent } from './common/create/create.component';
import { HomeComponent } from './common/home/home.component';
import { AdminguardService } from './guards/adminguard.service';
import { TaskerguardService } from './guards/taskerguard.service';
import { LoginComponent } from './registration/login/login.component';
import { TaskerpanelComponent } from './tasker/taskerpanel/taskerpanel.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateComponent},
  //admin
  { path: 'admin/queue', component: RequestqueueComponent, canActivate: [AdminguardService] },
  { path: 'admin/manage', component: ManagementComponent, canActivate: [AdminguardService] },
  { path: 'admin/taskers', component: ManagetaskersComponent, canActivate: [AdminguardService]},

  // tasker
  { path: 'tasker/panel', component: TaskerpanelComponent, canActivate: [TaskerguardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
