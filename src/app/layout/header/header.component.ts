import {
  Component,
  EventEmitter,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import { GeneralService } from "src/app/core/services/general.service";
import { Observable, of } from "rxjs";
import { ITruchartsCompanyModel } from "src/app/core/models/trucharts-company.model";
import { LocalstorageHelper } from "src/app/core/helpers/localstorage.helper";
import { ViewMode, LocalStorageConstants } from "src/app/core/constants/app.const";
import { AuthService } from "src/app/core/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AutoComplete } from "primeng";
import { UtilityService } from "src/app/utilities/utility.service";
import { UserService } from "src/app/core/services/user.service";
import { DOCUMENT } from '@angular/common';
import { LoginService } from "src/app/core/services/login.service";
@Component({
  selector: "app-header",
  templateUrl: "./header-copy.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild("autocomplete") autocomplete: AutoComplete;
  @ViewChild("checkboxTheme") checkboxTheme: ElementRef;

  @Output() loginEmitter = new EventEmitter<any>();
  @Output() changePasswordEmitter = new EventEmitter<any>();
  @Input() viewMode: string;

  isLightMode: boolean = true;
  text: string;
  accountBalances: any;
  toggle: boolean = true;
  toggleclose: boolean = true;
  accountNo: any;
  results: Observable<ITruchartsCompanyModel[]>;

  visibleSidebar;
  tradierdata: any;
  constructor(
    private loginService: LoginService,
    private _generalService: GeneralService,
    private _localstorageHelper: LocalstorageHelper,
    public _authService: AuthService,
    private _userService: UserService,
    private _toastr: ToastrService,
    private _router: Router,
    private utilityService: UtilityService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this._localstorageHelper.getViewMode().subscribe((mode) => {
      this.viewMode = mode;
      this.replaceBodyTheme(this.viewMode);
    });

    this._localstorageHelper.tradierCred$.subscribe((tradierCred: any) => {
      // console.log(tradierCred);
      if (tradierCred.TradierAccountNo) {
        this.getAccountBalance();
        this.accountNo = tradierCred.accountNo;
      } else {
        this.accountNo = "";
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewMode = localStorage.getItem(LocalStorageConstants.ViewMode);
    this.checkboxTheme.nativeElement.checked = this.viewMode === ViewMode.DARK_MODE;
  }

  replaceBodyTheme(mode) {
    switch (mode) {
      case 'light-mode':
        this.document.body.classList.remove('night-mode');
        break;
      case 'night-mode':
        this.document.body.classList.remove('light-mode');
        break;
      default:
        break;
    }
    this.document.body.classList.add(this.viewMode);
  }

  change() {
    this.toggle = !this.toggle;
  }

  closeNav() {
    this.toggle = true;
  }

  search(event) {
    if (event.type === "keyup") return;
    this.results = this._generalService.getSearchCompanies(event.query);
  }

  switchMode() {
    console.log(this.viewMode, this.viewMode === ViewMode.LIGHT_MODE, 'start');
    this.viewMode = this.viewMode === ViewMode.LIGHT_MODE ? ViewMode.DARK_MODE : ViewMode.LIGHT_MODE;
    this._localstorageHelper.setViewMode(this.viewMode);
    console.log(this.viewMode, 'end');
    
  }
  public doRegister() {
   
    this.loginService.showRegisterForm();
  }
  performLogin() {
    this.loginEmitter.emit(true);
  }

  performLogout() {
    this._authService.logout().subscribe((data) => {
      this._toastr.info("You have signed out");
    });
    this._localstorageHelper.setloginToTradier("", "");
    localStorage.clear();
  }

  performChangePasword() {
    this.changePasswordEmitter.emit();
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  get name() {
    return this._authService.name;
  }

  onSelect(event) {
    this._router.navigate(["/stockchart/" + event.ticker]);
  }

  onKeyUp(event) {
    if (event.key === "Enter") {
      this.clearSuggestions();
      this.clearInput();
      this.autocomplete.hide();
      this._router.navigate(["/stockchart/" + event.target.value]);
    }
  }

  clearInput() {
    this.text = null;
  }

  clearSuggestions() {
    this.results = null;
  }

  analyze() {
    this._router.navigate(["/stockchart/" + this.text]);
  }

  onLoginToTradierClick() {
    const state = "rendome123String";
    this._authService.doAuthorization(false, state, (data) => { });
  }

  getAccountBalance() {
    this._userService.getAccountBalances().subscribe(
      (data) => {
        this.tradierdata = data;
      },
      (error) => {
        this.tradierdata = null;
      }
    );
  }

  get latestSymbol() {
    return this._localstorageHelper.getLatestViewedSymbol();
  }
}
