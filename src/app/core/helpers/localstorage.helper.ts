import { Injectable } from '@angular/core';
import { LocalStorageConstants, ViewMode } from '../constants/app.const';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageHelper {
  private viewModelSubject$: Subject<string> = new Subject<string>();;
  public tradierCred$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { 
    this.tradierCred$.next(this.getloginToTradier());
  }

  getViewMode() {
    this.loadViewMode();
    return this.viewModelSubject$.asObservable();
  }

  setViewMode(mode: string) {
    localStorage.setItem(LocalStorageConstants.ViewMode, mode);
    this.viewModelSubject$.next(mode);
  }

  loadViewMode() {
    let mode = ViewMode.LIGHT_MODE;
    if (localStorage.getItem(LocalStorageConstants.ViewMode)) {
      mode = localStorage.getItem(LocalStorageConstants.ViewMode);
    }
    this.viewModelSubject$.next(mode);
  }

  getViewModelInitial() {
    let mode = ViewMode.LIGHT_MODE;
    if (localStorage.getItem(LocalStorageConstants.ViewMode)) {
      mode = localStorage.getItem(LocalStorageConstants.ViewMode);
    }
    return mode;
  }

  setLatestViewedSymbol(symbol: string) {
    localStorage.setItem(LocalStorageConstants.LatestViewedSymbol, symbol);
  }

  getLatestViewedSymbol() {
    if (!!localStorage.getItem(LocalStorageConstants.LatestViewedSymbol))
      return localStorage.getItem(LocalStorageConstants.LatestViewedSymbol);
    return 'TSLA';
  }


  getloginToTradier() {
    var TradierTokenKey = localStorage.getItem(LocalStorageConstants.TradierTokenKey);
    var TradierAccountNo = localStorage.getItem(LocalStorageConstants.TradierAccountNo);
    return { TradierTokenKey, TradierAccountNo }
  }

  setloginToTradier(tradierTokenKey: string, tradierAccountNo: string) {
    localStorage.setItem(LocalStorageConstants.TradierTokenKey, tradierTokenKey);
    localStorage.setItem(LocalStorageConstants.TradierAccountNo, tradierAccountNo);
    this.tradierCred$.next(this.getloginToTradier());
  }
}
