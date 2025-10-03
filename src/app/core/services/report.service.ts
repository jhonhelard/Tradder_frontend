import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddFavoriteRequest, MarketReportDetailsRequest, MarketReportDetailsResponse } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly truchartsAPI = environment.truchartsAPI;

  constructor(private _http: HttpClient) { }

  GetMarketReport(): Observable<any[]> {
    return this._http.get<any[]>(this.truchartsAPI + "/report/GetMarketReport");
  }

  GetMarketReportDetails(filer: MarketReportDetailsRequest): Observable<MarketReportDetailsResponse> {
    return <Observable<MarketReportDetailsResponse>>this._http.post(`${this.truchartsAPI}/report/GetMarketReportDetails`, filer);
  }

  AddtoFavorites(filer: AddFavoriteRequest): Observable<string> {
    return <Observable<string>>this._http.post(`${this.truchartsAPI}/report/AddtoFavorites`, filer);
  }

  GetMarketReportStockList(reportType: string): Observable<any[]> {
    return this._http.get<any[]>(this.truchartsAPI + "/report/GetMarketReportStockList?ReportType=" + reportType);
  }

  GetSectorWiseStockList(Sector: string): Observable<any[]> {
    return this._http.get<any[]>(this.truchartsAPI + "/report/GetSectorWiseStockList?Sector=" + Sector);
  }

}
