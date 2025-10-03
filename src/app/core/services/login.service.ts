import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private _showLoginForm = new Subject();
  private _showRegisterForm = new Subject();
  private _loginStatusChanged = new Subject();
  //private menuFormConfirmationSavedSubject = new Subject<boolean>();

  showLoginForm$ = this._showLoginForm.asObservable();
  showRegisterForm$ = this._showRegisterForm.asObservable();
  loginStatusChanged$ = this._loginStatusChanged.asObservable();
  //menuFormConfirmationSaved$ = this.menuFormConfirmationSavedSubject.asObservable();

  showLoginForm() {
    this._showLoginForm.next();
  }

  showRegisterForm() {
    this._showRegisterForm.next();
  }

  loginStatusChanged(){
    this._loginStatusChanged.next();
  }
  // confirmSaveMenuForm(saved: boolean) {
  //   this.menuFormConfirmationSavedSubject.next(saved);
  // }
}
