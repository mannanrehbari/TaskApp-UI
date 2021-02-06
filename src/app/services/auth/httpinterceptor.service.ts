import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor{

  constructor(private jwtHelper: JwtHelperService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var jwtToken = localStorage.getItem('token');
    if(jwtToken != null && !this.jwtHelper.isTokenExpired(jwtToken)){
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token')
        }
      })
    } else {

    }
    
    return next.handle(req);
  }
}
