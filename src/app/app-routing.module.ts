import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TesthomeComponent } from './test/testhome/testhome.component';


const routes: Routes = [
  { path: '', component: TesthomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
