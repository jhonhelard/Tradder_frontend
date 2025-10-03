import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TradierService } from 'src/app/core/services/tradier.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TraderDetailsComponent } from './trader-details/trader-details.component';
import { GeneralService } from 'src/app/core/services/general.service';
import { UserService } from 'src/app/core/services/user.service';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.css']
})
export class TraderComponent implements OnInit, AfterViewInit {
  @ViewChild('collapse', { static: false }) collapse: ElementRef;
  @Input() symbol: string;

  isTradierLoggedIn: boolean = false;
  isAccordionOpen = false;
  usersAccountBalances: any;
  submitted = false;
  orderSubmitted = false;
  submitInProgress = false;
  tradierdata: any;

  totalAccountValue:any;

  constructor(private _localstorageHelper: LocalstorageHelper, private toastr: ToastrService, private _userService: UserService, private modalService: BsModalService, private generalService: GeneralService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAccordionOpen = !this.generalService.isMobileView()
    this._localstorageHelper.tradierCred$.subscribe((tradierCred: any) => {
      
      if (tradierCred.TradierAccountNo) {
        this.isTradierLoggedIn = true;
        this.getAccountBalance();
      }
      else {
        this.isTradierLoggedIn = false;
      }
    });

  }

  ngAfterViewInit(): void {
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    if (width <= 768) {
      this.collapse.nativeElement.dispatchEvent(new MouseEvent('click'));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  orderSubmittedCb = () => {
    this.orderSubmitted = !this.orderSubmitted;
  }

  exploreMore() {
    if (this.authService.isLoggedIn) {
      const cred = this._localstorageHelper.getloginToTradier();
      if (!cred.TradierAccountNo) {
        this.authService.doAuthorization(false, "rendone1234", (data) => {
          this.openTradierBox();
        });
      }
      else {
        this.openTradierBox();
      }
    } else {
      this.toastr.warning('Please login first', 'Login');
    }

  }

  openTradierBox() {
    const symbol = this.symbol;
    const initialState = { symbol };
    this.modalService.show(TraderDetailsComponent, { class: 'modal-xl', initialState });
  }

  getAccountBalance() {
    this._userService.getAccountBalances().subscribe((data) => {
      this.tradierdata = data;

      this.totalAccountValue = (+this.tradierdata?.balances?.total_equity);
    }, error => {
      this.tradierdata = null;
    });
  }
}
