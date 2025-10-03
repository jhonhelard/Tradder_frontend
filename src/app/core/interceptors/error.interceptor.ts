import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401 || err.status == 403) {
            // this.localstorageHelper.setloginToTradier('', '');
            console.log('401',err);
          }
          return throwError({ status: err.status, message: err.message });
        } else if (err.error instanceof ErrorEvent) { // Client Side Error                    
          return throwError({ status: err.status, message: err.error.message });
        } else {  // Server Side Error                    
          return throwError(err);
        }
      })
    );
  }

}
