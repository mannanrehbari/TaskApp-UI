import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskerguardService implements CanActivate{

  constructor() { }

  canActivate(): boolean {
    if(localStorage.getItem('role') == 'ROLE_TASKER'){
      return true;
    }
    return false;
  }
}