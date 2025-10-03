import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackTestReposonseModel, BackTestRequestModel, BasicBackTestRequestModel, IndicatorModel } from '../models/backtest.model';
import { IResult } from '../models/stripe.model';
import { IWatchListModel } from '../models/watch-list.model';

@Injectable({
  providedIn: 'root'
})
export class TruchartsService {
  private readonly truchartsAPI = environment.truchartsAPI;

  constructor(private _http: HttpClient) { }

  getWatchList(): Observable<IWatchListModel[]> {
    const email = localStorage.getItem('app_email');
    const api = `${this.truchartsAPI}/user/Watchlist?useremail=${email}`;
    return <Observable<IWatchListModel[]>>this._http.get(api);
  }

  getChartSettingsList(): Observable<IWatchListModel[]> {
    const email = localStorage.getItem('app_email');
    const api = `${this.truchartsAPI}/Stock/getChartSettings/${email}`;
    return <Observable<IWatchListModel[]>>this._http.get(api);
  }

  updateWatchList(name, ticker) {
    const email = localStorage.getItem('app_email');
    const token = localStorage.getItem('app_access_token');
    const api = `${this.truchartsAPI}/user/WatchlistUpdate?useremail=${email}`;
    var header = {
      headers: new HttpHeaders()
        .set("Accept", "application/json")
        .set('Authorization', `Bearer ${token}`),
      ///.set('Authorization', `Bearer 794E1E47-8343-47C4-BA6B-6B8C01E39EDD`),
      params: {
        name,
        ticker
      }
    };
    // const data = {
    //   name,
    //   ticker
    // };
    return this._http.put(api, header);
  }

  getOverlayOptions() {
    // var header = {
    //   headers: new HttpHeaders()
    //     .set("Accept", "application/json")
    //     //.set('Access-Control-Allow-Origin', '*')
    // };
    return <Observable<any>>this._http.get(`${this.truchartsAPI}/stock/Overlay`);
  }

  getIndicatorOptions() {
    return <Observable<any>>this._http.get(`${this.truchartsAPI}/stock/Indicator`);
  }

  getIndicatorOptionsDynamic(type: string) {
    return <Observable<IndicatorModel[]>>this._http.get(`${this.truchartsAPI}/stock/GetIndicatorDynamic?type=${type}`);
  }

  runBackTest(model: BackTestRequestModel): Observable<BackTestReposonseModel> {
    return this._http.post<BackTestReposonseModel>(this.truchartsAPI+"/subscript/createsubscription", model);
  }
  
  startTesting(model: BasicBackTestRequestModel): Observable<BackTestReposonseModel> {
    return this._http.post<BackTestReposonseModel>(this.truchartsAPI+"/backTest/all", model);
  }
  
  createChartSettingsTemplate(
    name: string,
    duration: string,
    cycle: string,
    type: string,
    tcStrategy: string,
    priceOverlay: any,
    indicator: any
  ) {
    const email = localStorage.getItem('app_email');
    const token = localStorage.getItem("app_access_token");
    const api = `${this.truchartsAPI}/Stock/saveChartSettings/${email}`;
    var header = {
      headers: new HttpHeaders()
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`),
      params: {
        name,
        chartSetting: {
          duration,
          cycle,
          type,
          tcStrategy,
          priceOverlay,
          indicator,
        },
      },
    };

    return this._http.put(api, header.params, { headers: header.headers });
  }

  updateWatchlist(
    name: string,
    ticker: string,
  ) {
    const email = localStorage.getItem('app_email');
    const token = localStorage.getItem("app_access_token");
    const api = `${this.truchartsAPI}/user/WatchlistUpdate?useremail=${email}`;
    var header = {
      headers: new HttpHeaders()
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`),
      params: {
        name,
        ticker
      },
    };

    return this._http.put(api, header.params, { headers: header.headers });
  }
}
