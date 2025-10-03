import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SymbolAlertService {
  private _showAlertForm = new Subject();
  showAlertForm$ = this._showAlertForm.asObservable();

  showAlertForm() {
    this._showAlertForm.next();
  }
}
