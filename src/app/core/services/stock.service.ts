import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ITicketModel } from '../models/ticket.model';
import { map } from 'rxjs/operators'
import { HeatMapResultSetModel } from '../models/heatmap.model';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly truchartsAPI = environment.truchartsAPI;

  constructor(private _http: HttpClient) { }

  getRecentlyViewedStocks() {
    const api = this.truchartsAPI + `/stock/recentlyViewed/get?userid=punekiran@gmail.com`;
    return this._http.get(api).pipe(map((x: any) => x.recentlyViewed));
  }

  getTopGainer(): Observable<ITicketModel[]> {
    return this._http.get<ITicketModel[]>(this.truchartsAPI + `/stock/get?condition=gainers`);
  }

  getTopLooser(): Observable<ITicketModel[]> {
    return this._http.get<ITicketModel[]>(this.truchartsAPI + `/stock/get?condition=losers`);
  }

  getTopActive(): Observable<ITicketModel[]> {
    return this._http.get<ITicketModel[]>(this.truchartsAPI + `/stock/get?condition=topTraded`);
  }

  getSessionKey(): Observable<any> {
    return this._http.get(this.truchartsAPI + `/Stock/GetSessionKey`)
  }

  getClock() {
    return this._http.get(this.truchartsAPI + `/Stock/GetClock`)
  }

  getMarketQuotes(symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Stock/GetMarketsQuotes`, { params });
  }

  GetMarketCap(symbol: string): Observable<any> {
 
    return this._http.get(this.truchartsAPI + `/proxy/get-marketcap?symbol=${symbol}`);

  }


  buySell(symbol, side, quantity, type, duration) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    params = params.set('side', side);
    params = params.set('quantity', quantity);
    params = params.set('type', type);
    params = params.set('duration', duration);

    return this._http.get(this.truchartsAPI + `/stock/BuySellStock`, { params });
  }
  getDividends(symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Stock/GetDividends`, { params });
  }

  getStableStock(symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Stock/GetStableStock`, { params });
  }
  GetCompanyProfile (symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Stock/GetCompanyProfile`, { params });
  }
  GetFundamentals (symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Stock/GetFundamentals`, { params });
  }

  isOptionable(symbol) {
    return this._http.get(this.truchartsAPI+"/user/isOptionable?stockSym=" + symbol);
  }

  getCloseStock(symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Stock/GetCloseStock`, { params });
  }

  getDividentHistory(symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Stock/GetDividentHistory`, { params });
  }

  GetHeatMapData(type: string): Observable<HeatMapResultSetModel[]> {
    return this._http.get<HeatMapResultSetModel[]>(this.truchartsAPI + `/user/GetHeatMapData?type=` + type);
    }

 
}
