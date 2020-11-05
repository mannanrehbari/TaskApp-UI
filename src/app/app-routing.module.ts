import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestqueueComponent } from './admin/requestqueue/requestqueue.component';
import { CreateComponent } from './common/create/create.component';
import { HomeComponent } from './common/home/home.component';
import { AdminguardService } from './guards/adminguard.service';
import { LoginComponent } from './registration/login/login.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateComponent},

  //admin
  { path: 'admin/queue', component: RequestqueueComponent, canActivate: [AdminguardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
