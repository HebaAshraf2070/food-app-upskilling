import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() { }

  // func return req when we call api
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // (request: HttpRequest<unknown> ==> request to api
    // , next: HttpHandler ===> response from api

    const baseUrl = 'https://upskilling-egypt.com:3006/api/v1/';
    const token = localStorage.getItem("userToken");

    // get instance from request and add to it baseurl and save this in new var and make the new var be the req that call the api
    let newRequest = request.clone({
      url: baseUrl + request.url,
      setHeaders: {
        'Authorization': ` ${token}`,
        // 'Authorization': `Bearer + ${token}` 
      }
    })


    return next.handle(newRequest);
  }
}
