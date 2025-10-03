import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RoleConst } from '../constants/app.const';
import { LocalstorageHelper } from '../helpers/localstorage.helper';
import { IWatchListModel } from '../models/watch-list.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tradierAPI = environment.tradierAPI
  tradierClientId = environment.tradierClientId

  path: string = `${this.tradierAPI}/oauth/authorize?client_id=${this.tradierClientId}&scope=read, write, trade, market, stream`; // should not include space for IE

  private readonly truchartsAPI = environment.truchartsAPI;
  private windowHandle: Window;   // reference to the window object we will create    
  private intervalId: any = null;  // For setting interval time between we check for authorization code or token
  private loopCount = 600;   // the count until which the check will be done, or after window be closed automatically.
  private intervalLength = 100;   // the gap in which the check will be done for code.

  constructor(private _http: HttpClient, private _router: Router, private _localstorageHelper: LocalstorageHelper, private _loginService: LoginService) { }

  public get isLoggedIn() {
    return !!this.getToken;
  }

  public get userName() {
    return localStorage.getItem('app_email');
  }

  public get name() {
    return localStorage.getItem('app_name');
  }

  public get getToken() {
    return localStorage.getItem('app_access_token');
  }

  public get WatchList() {
    if (!!localStorage.getItem('app_watchlist'))
      return <IWatchListModel[]>JSON.parse(localStorage.getItem('app_watchlist'));
    return [];
  }

  login(userlogin: any) {
    const url: string = `${this.truchartsAPI}/user/login`;
    let headers = new HttpHeaders()
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');

    let options = { headers: headers };

    return this._http.post<any>(url, userlogin, options)
      .pipe(map(result => {
        if (!!result.token) {
          
          localStorage.setItem('app_access_token', result.token);
          localStorage.setItem('app_email', result.email);
          localStorage.setItem('app_name', result.name);
          localStorage.setItem('app_userRole', result.userRole ?? RoleConst.GeneralUser);
          localStorage.setItem('app_watchlist', JSON.stringify(result.watchList));
          this._loginService.loginStatusChanged();
        }
        return result;
      }),
        catchError((error: HttpErrorResponse) => {
          return of({});
        }));
  }

  register(userlogin: any) {
    const url: string = `${this.truchartsAPI}/user/register`;
    let headers = new HttpHeaders()
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');

    let options = { headers: headers };

    return this._http.post<any>(url, userlogin, options)
      .pipe(map(result => {
        if (!!result.token) {
          localStorage.setItem('app_access_token', result.token);
          localStorage.setItem('app_email', userlogin.email);
          localStorage.setItem('app_name', userlogin.name);
          localStorage.setItem('app_userRole', result.userRole ?? RoleConst.GeneralUser);
        }
        return result;
      }),
        catchError((error: HttpErrorResponse) => {
          return of({});
        }));
  }

  changePassword(userlogin: any) {
    const url: string = `${this.truchartsAPI}/user/changePassword`;
    let headers = new HttpHeaders()
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('Access-Control-Allow-Origin', '*');

    let options = { headers: headers };

    userlogin.email = this.userName;

    return this._http.post<any>(url, userlogin, options)
      .pipe(map(result => {
        if (!!result.token) {
          localStorage.setItem('app_access_token', result.token);
        }
        return result;
      }),
        catchError((error: HttpErrorResponse) => {
          return of({});
        }));
  }

  logout() {
    localStorage.removeItem('app_access_token');
    localStorage.removeItem('app_email');
    localStorage.removeItem('app_watchlist');
    localStorage.removeItem('app_name');
    this._loginService.loginStatusChanged();
    //localStorage.removeItem(AppConst.APP_APP_USER_STOREID);
    //localStorage.removeItem(AppConst.APP_APP_USER_STOREBRANCHID);
    //this._router.navigate(['/']);//.then(() => location.reload());
    const currentRoute = this._router.url;
    if(currentRoute == '/subscript-change' || currentRoute == '/customer-card-list'){
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate([currentRoute]);
      });
    }
    return of({ isSusscee: true });
  }

  getQueryString(field: any, url: string) {
    const windowLocationUrl = url;
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(windowLocationUrl);
    return string ? string[1] : null;
  }

  doAuthorization(isRegisterAction: boolean, state: string, callback: Function) {
    let loopCount = this.loopCount;
    const path = this.path + "&state=" + state;

    /* Create the window object by passing url and optional window title */
    this.windowHandle = this.createOauthWindow(path, 'OAuth login');

    /* Now start the timer for which the window will stay, and after time over window will be closed */
    this.intervalId = window.setInterval(() => {
      if (loopCount-- < 0) {
        window.clearInterval(this.intervalId);
        this.windowHandle.close();
      } else {
        let href: string;  // For referencing window url
        try {
          href = this.windowHandle.location.href; // set window location to href string
        } catch (e) {
          // console.log('Error:', e); // Handle any errors here
        }
        if (href != null) {

          // Method for getting query parameters from query string

          /* As i was getting code and oauth-token i added for same, you can replace with your expected variables */
          if (href.match('code')) {
            // for google , fb, github, linkedin
            window.clearInterval(this.intervalId);
            this.loginToTradier(this.getQueryString('code', href)).subscribe((data) => callback(data));
            this.windowHandle.close();
            if (isRegisterAction) {
              /* call signup method */
            } else {
              /* call login method */
            }
          }
          // else if (href.match('oauth_token')) {
          //   // for twitter
          //   window.clearInterval(this.intervalId);
          //   this.oAuthToken = getQueryString('oauth_token', href);
          //   this.oAuthVerifier = getQueryString('oauth_verifier', href);
          //   this.windowHandle.close();
          //   if (isRegisterAction) {
          //     /* call signup */
          //   } else {
          //     /* call login */
          //   }
          // }
        }
      }
    }, this.intervalLength);
  }

  createOauthWindow(url: string, name = 'Authorization', width = 500, height = 600, left = 0, top = 0) {
    if (url == null) {
      return null;
    }
    const options = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, name, options);
  }

  loginToTradier(code) {
    return this.getloginToTradier(code).pipe(map((token: any) => {
      this._localstorageHelper.setloginToTradier(token.accessToken, token.profile.profile.account.account_number);
      return token;
    }));
  }

  getloginToTradier(code) {
    let params = new HttpParams();
    params = params.set('code', code);
    return this._http.get(this.truchartsAPI + `/user/PostLoginToTradier`, { params });
  }

}
