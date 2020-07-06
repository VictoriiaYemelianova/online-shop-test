import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from './service/user-service.service';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  private token: string;

  constructor(private userSevice: UserServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login') || req.url.includes('register')) {
      return next.handle(req);
    }

    if (this.userSevice.logUser) {
      this.token = this.userSevice.logUser.token;

      const tokenReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.token
        })
      });

      return next.handle(tokenReq);
    }

    return next.handle(req);
  }
}
