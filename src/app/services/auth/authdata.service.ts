import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthdataService {

  private roleSource = new BehaviorSubject<string>("ROLE_SEEKER");
  currentRole = this.roleSource.asObservable();

  private usernameSource = new BehaviorSubject<string>("");
  currentUsername = this.usernameSource.asObservable();

  private loggedinSource = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.loggedinSource.asObservable();

  private userIdSource = new BehaviorSubject<number>(null);
  currentUserId = this.userIdSource.asObservable();

  

  constructor() { }

  changeRole (role: string){
    this.roleSource.next(role);
  }

  changeLoggedin(loggedIn: boolean){
    this.loggedinSource.next(loggedIn);
  }

  changeUsername(username: string){
    this.usernameSource.next(username);
  }

  changeUserId(userId: number){
    this.userIdSource.next(userId);
  }

}
