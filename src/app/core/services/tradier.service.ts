import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TradierService {
  private readonly truchartsAPI = environment.truchartsAPI;
  constructor(private _http: HttpClient) { }

  equityBuySell(symbol, side, quantity, type, duration, price, stop, tag) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    params = params.set('side', side);
    params = params.set('quantity', quantity);
    params = params.set('type', type);
    params = params.set('duration', duration);
    params = params.set('price', price);
    params = params.set('stop', stop);
    params = params.set('tag', tag);

    return this._http.get(this.truchartsAPI + `/Tradier/EquityBuySellStock`, { params });
  }

  optionBuySell(symbol, side, quantity, type, duration, option_symbol, price, stop, tag) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    params = params.set('side', side);
    params = params.set('quantity', quantity);
    params = params.set('type', type);
    params = params.set('duration', duration);
    params = params.set('option_symbol', option_symbol);
    params = params.set('price', price);
    params = params.set('stop', stop);
    params = params.set('tag', tag);

    return this._http.get(this.truchartsAPI + `/Tradier/OptionBuySellStock`, { params });
  }
  multilegBuySell(data) {
    return this._http.post(this.truchartsAPI + `/Tradier/MultilegBuySellStock`, data);
  }

  getOrders() {
    return this._http.get(this.truchartsAPI + `/Tradier/GetOrders`);
  }

  getPosition() {
    return this._http.get(this.truchartsAPI + `/Tradier/GetPosition`);
  }

  getGainLoss(page, limit, sortBy, sort, start, end, symbol) {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('limit', limit);
    params = params.set('sortBy', sortBy);
    params = params.set('sort', sort);
    params = params.set('start', start);
    params = params.set('end', end);
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Tradier/GetGainLoss`, { params });
  }
  getOptionsChains(symbol, expiration) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    params = params.set('expiration', expiration);
    return this._http.get(this.truchartsAPI + `/Tradier/GetOptionsChains`, { params });
  }

  getOptionsExpiration(symbol) {
    let params = new HttpParams();
    params = params.set('symbol', symbol);
    return this._http.get(this.truchartsAPI + `/Tradier/GetOptionsExpairation`, { params });
  }
  
}
