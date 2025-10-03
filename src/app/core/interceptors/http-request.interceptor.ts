import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LocalstorageHelper } from '../helpers/localstorage.helper';

@Injectable()
export class HttptRequestInterceptor implements HttpInterceptor {
    constructor(private localstorageHelper: LocalstorageHelper) {

    }

    private setHeaders(request: HttpRequest<any>) {
        const cred = this.localstorageHelper.getloginToTradier();

        const token = cred.TradierTokenKey ?? '';
        const account_number = cred.TradierAccountNo ?? '';
        const app_access_token = localStorage.getItem('app_access_token') ?? '';

        request = request.clone({
            setHeaders: {
                'tradier_token': token,
                'token': app_access_token,
                'account_number': account_number
            }
        });

        return request;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (!req.url.includes('/user/login') && !req.url.includes('/user/register') && !req.url.includes('www.youtube.com'))
        if (!req.url.includes('/user/login') && !req.url.includes('/user/register') && !req.url.includes('www.youtube.com') && !req.url.includes('script.google.com'))
            req = this.setHeaders(req);

        if (req.url.includes('script.google.com')) {
            req = req.clone({
                setHeaders: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
                }
                });
        }

        return next.handle(req);
    }
}
