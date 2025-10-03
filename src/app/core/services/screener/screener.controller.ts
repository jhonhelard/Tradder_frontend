import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpController } from './http.controller';
import { Observable } from 'rxjs';
import { ScreenerData, ScreenerResponse } from '../../models/sceenerData.model';

@Injectable()
export class ScreenerController extends HttpController {
    private readonly baseUrl: string;

    constructor(public httpClient: HttpClient) {
        super(httpClient);
        this.baseUrl = `${this.apiUrl}`;
    }

    public getScanData(data: any): Observable<ScreenerResponse> {
        const url = `${this.baseUrl}/stock/ALL`;
        // const url = 'http://localhost:9000/api/stock/ALL';
        return this.sendRequest('POST', url, data);
    }
    public getSavedFilters(username): Observable<any[]> {
        const url = `${this.baseUrl}/stock/GetScreener?id=` + username;
        // const url = 'http://localhost:9000/api/user/screener';
        return this.sendRequest('GET', url);
    }

    public saveFilterData(username, data: any): Observable<boolean> {
        const url = `${this.baseUrl}/stock/SaveScreener?id=` + username;
        return this.sendRequest('PUT', url, data);
    }

    public deleteFilterData(username, data: any): Observable<boolean> {
        const url = `${this.baseUrl}/stock/deleteScreens?id=${username}&name=${data}`;
        return this.sendRequest('DELETE', url);
    }

}
