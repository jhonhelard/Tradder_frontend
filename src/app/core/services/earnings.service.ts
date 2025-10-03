import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EarningsService {
  // private apiUrl = 'https://trucharts.net/api/proxy/get-earnings';

  constructor(private http: HttpClient) {}

  getEarnings(symbol: string): Observable<any> {
    const url = `https://trucharts.net/api/proxy/get-earnings?symbols=${symbol}`;
    return this.http.get<any>(url);
  }
  getNews(symbol: string): Observable<any> {
    return this.http.get<any>(`https://trucharts.net/api/proxy/get-news/symbol=${symbol}`);
  }
}
