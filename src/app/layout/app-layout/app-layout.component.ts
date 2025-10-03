import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  Inject,
} from "@angular/core";
import { LocalstorageHelper } from "src/app/core/helpers/localstorage.helper";
import {
  LocalStorageConstants,
  ViewMode,
} from "src/app/core/constants/app.const";
import { AuthService } from "src/app/core/services/auth.service";
import { HeaderComponent } from "../header/header.component";
import { SymbolHeaderComponent } from "src/app/features/symbol-details/symbol-header/symbol-header.component";
import { LoginService } from "src/app/core/services/login.service";
import { SymbolAlertService } from "src/app/core/services/symbol-alert.service";
import { StockService } from "src/app/core/services/stock.service";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-app-layout",
  templateUrl: "./app-layout.component.html",
  styleUrls: ["./app-layout.component.css"],
})
export class AppLayoutComponent implements OnInit, AfterViewInit {
  //@ViewChildren(SymbolHeaderComponent) symbolHeaderComponentQ: QueryList<SymbolHeaderComponent>;

  viewMode: string = ViewMode.LIGHT_MODE;
  isLogginIn = false;
  isAlertModal = false;
  isRegisting = false;
  isChangingPassword = false;
  isForgottingPassword = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private _localstorageHelper: LocalstorageHelper,
    private _authService: AuthService,
    private stockService: StockService,
    private _loginService: LoginService,
    private _alertService: SymbolAlertService,
    private _router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this._localstorageHelper.getViewMode().subscribe((mode) => {
      this.viewMode = mode;
      this.replaceBodyTheme(mode);
      if (!this.viewMode) this.viewMode = ViewMode.DARK_MODE;
    });

    this._loginService.showLoginForm$.subscribe(() => {
      this.showLoginModal(null);
    });

    this._loginService.showRegisterForm$.subscribe(() => {
      this.showRegisterModal(null);
    });
    this._alertService.showAlertForm$.subscribe(() => {
      this.showAlertModal(null);
    });
  }

  ngAfterViewInit() {
    this._localstorageHelper.setViewMode(this.viewMode);
    this.cdr.detectChanges();
  }

  replaceBodyTheme(mode) {
    switch (mode) {
      case "light-mode":
        this.document.body.classList.remove("night-mode");
        break;
      case "night-mode":
        this.document.body.classList.remove("light-mode");
        break;
      default:
        break;
    }
    this.document.body.classList.add(this.viewMode);
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  // get symbolHeaderComponent() {
  //   return this.symbolHeaderComponentQ.first;
  // }

  showLoginModal(event) {
    this.isLogginIn = true;
    this.isRegisting = false;
    this.isForgottingPassword = false;
  }

  showAlertModal(event) {
    this.isAlertModal = true;
  }
  
  showRegisterModal(event) {
    this.isLogginIn = false;
    this.isRegisting = true;
    this.isForgottingPassword = false;
  }

  showForgotPasswordModal(event) {
    this.isLogginIn = false;
    this.isRegisting = false;
    this.isForgottingPassword = true;
  }

  showChangePasswordModel(event) {
    this.isChangingPassword = true;
  }

  hideLoginModal(event) {
    this.isLogginIn = false;
  }

  hideAlertSettingModal(event) {
    this.isAlertModal = false;
  }
  
  hideRegisterModal(event) {
    this.isRegisting = false;
    // let plan = localStorage.getItem(
    //   LocalStorageConstants.SelectedSubscriptionPlan
    // );
    // if (plan && plan != null && plan != undefined) {
    //   this._router
    //     .navigateByUrl("/", { skipLocationChange: true })
    //     .then(() => this._router.navigate(["/subscript"]));
    // }
  }

  hideChangePasswordModel(event) {
    this.isChangingPassword = false;
  }

  onLoggedIn(event) {
    // if (!!this.symbolHeaderComponent)
    //   this.symbolHeaderComponent.loadWatchList();
    let plan = localStorage.getItem(
      LocalStorageConstants.SelectedSubscriptionPlan
    );
    if (plan && plan != null && plan != undefined) {
      this._router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this._router.navigate(["/subscript"]));
    }
  }
}
