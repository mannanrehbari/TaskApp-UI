import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    if(localStorage.getItem('username') && localStorage.getItem('token')){
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token')
        }
      })
    }
    
    return next.handle(req);
  }
}
