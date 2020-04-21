import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import UserService from '@services/user-service'
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _userService: UserService,
    //private _router: Router
    ) {

    }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = this._userService.getToken();

    if(token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      (obs) => {
        obs.subscribe(null, error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log('401', error);
              this._userService.clearToken();
              //this._router.navigate(['/login']);
            }

            if (error.status === 403) {
              console.log('403', error);
              //this._router.navigate(['/unauthorized']);
            }
          }
        })

        return obs;
      }
    );
  }
}
