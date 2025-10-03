import { DebugElement, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStockNewsModel } from '../models/stock-news.model';
import { ITruchartsCompanyModel } from '../models/trucharts-company.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private readonly truchartsAPI = environment.truchartsAPI;

  constructor(private _http: HttpClient) { }

  getNews(symbol: string): Observable<any> {
    // Replace with your actual API endpoint
    return this._http.get<any>(`https://trucharts.net/api/proxy/get-news?symbol=${symbol}`);
  }
  getStockNews(): Observable<IStockNewsModel[]> {
    return this._http.get<IStockNewsModel[]>(`${this.truchartsAPI}/proxy/get-news?symbol=MSFT`);
  }

  getSymbolNews(symbol: string): Observable<IStockNewsModel[]> {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get<IStockNewsModel[]>(`${this.truchartsAPI}/stockStats/GetSymbolNews`, { params });
  }

  getSearchCompanies(searchText: string): Observable<ITruchartsCompanyModel[]> {
    return this._http.get<ITruchartsCompanyModel[]>(`${this.truchartsAPI}/companies/GET?matchingString=${searchText}&limit=10`);
  }

  getUserDetails() {
    return this._http.get(`${this.truchartsAPI}/user/UserDetails?userId=punekiran@gmail.com`);
  }

  getQuotes(symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    params = params.set('greeks', 'false');
    return this._http.get(this.truchartsAPI + `/StockStats/GetMarketsQuotes`, { params });
  }

  getEarningsNext(symbol: string): Observable<any> {
    let params = new HttpParams().set('symbols', symbol);
    return this._http.get(`${this.truchartsAPI}/proxy/get-earnings`, { params });
}
getEarnings(symbol: string): Observable<any> {
  return this._http.get<any>(`https://trucharts.net/api/proxy/get-earnings?symbol=${symbol}`);
}
  getReplaceQuotes(symbol: string) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/StockStats/GetReplaceQuotes`, { params });
  }

  GetMarketCap(symbol: string): Observable<any> {
 
    return this._http.get(`https://trucharts.net/api/proxy/get-marketcap?symbol=${symbol}`);

  }

  getEarningsDate(symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/StockStats/GetEarningsDate`, { params });
  }

  isMobileView() {
    const scrWidth = window.innerWidth;

    return scrWidth < 1000;
  }
}
