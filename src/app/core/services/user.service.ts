import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  RoleModel,
  UpdateRoleRequestModel,
  UserFilterModel,
  UserPageResult,
} from "../models/user-info.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly truchartsAPI = environment.truchartsAPI;

  constructor(private _http: HttpClient) {}

  getAccountBalances() {
    return this._http.get(this.truchartsAPI + `/user/GetAccountBalances`);
  }

  getUserInfo(filer: UserFilterModel): Observable<UserPageResult> {
    return <Observable<UserPageResult>>(
      this._http.post(`${this.truchartsAPI}/user/GetUserInformation`, filer)
    );
  }

  getRoles(): Observable<RoleModel[]> {
    return <Observable<RoleModel[]>>(
      this._http.get(`${this.truchartsAPI}/user/GetRoles`)
    );
  }

  updateRole(model: UpdateRoleRequestModel): Observable<string> {
    return <Observable<string>>(
      this._http.put(`${this.truchartsAPI}/user/UpdateRole`, model)
    );
  }

  getWatchList(userEmail): Observable<any> {
    return <Observable<any>>(
      this._http.get(
        `${this.truchartsAPI}/user/Watchlist?useremail=${userEmail}`
      )
    );
  }

  getChartList() {
    const userEmail = localStorage.getItem("app_email");
    return <Observable<any>>(
      this._http.get(
        `https://trucharts.net/api/user/Watchlist?useremail=${userEmail}`
      )
    );
  }
  makeDefaultWatchList(id: number) {
    const userEmail = localStorage.getItem("app_email");
    return <Observable<any>>(
      this._http.put(
        `https://trucharts.net/api/user/SetPrimaryWatchList?useremail=${userEmail}&WatchlistId=` +
          id,
        id
      )
    );
  }
  getPrimaryWatchList() {
    const userEmail = localStorage.getItem("app_email");
    return <Observable<any>>(
      this._http.get(
        `https://trucharts.net/api/user/GetPrimaryWatchList?useremail=${userEmail}`
      )
    );
  }

  createChartList(data: any) {
    const userEmail = localStorage.getItem("app_email");
    return <Observable<any>>(
      this._http.put(
        `https://trucharts.net/api/user/WatchlistUpdateMultiple?useremail=${userEmail}`,
        data
      )
    );
  }

  updateChartList(data: any) {
    const userEmail = localStorage.getItem("app_email");
    return <Observable<any>>(
      this._http.put(
        `https://trucharts.net/api/user/WatchlistUpdateMultiple?useremail=${userEmail}`,
        data
      )
    );
  }

  deleteChartList(data: any) {
    const userEmail = localStorage.getItem("app_email");
    return <Observable<any>>(
      this._http.delete(
        `https://trucharts.net/api/user/WatchlistDelete?useremail=${userEmail}`,
        data
      )
    );
  }
}