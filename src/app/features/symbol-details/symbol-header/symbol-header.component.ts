import { DecimalPipe, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';
import { IWatchListModel } from 'src/app/core/models/watch-list.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { TruchartsService } from 'src/app/core/services/trucharts.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { StockService } from 'src/app/core/services/stock.service';
import { interval, Subscription } from 'rxjs';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TraderDetailsComponent } from '../trader/trader-details/trader-details.component';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { RoleConst } from 'src/app/core/constants/app.const';

declare var $: any;

@Component({
  selector: 'app-symbol-header',
  templateUrl: './symbol-header.component.html',
  styleUrls: ['./symbol-header.component.css']
})
export class SymbolHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('closeBtn') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('showOrderDetail') showOrderDetail: ElementRef<HTMLElement>;

  @Input() symbol: ITradierSymbol;
  subscription: Subscription;
  hide: any;
  portfolios: SelectItem[];
  types: SelectItem[];
  watchLists: any;
  myWebSocket: WebSocketSubject<any> = webSocket('wss://ws.tradier.com/v1/markets/events');
  priceObj: any[] = [];
  sessionId: string = '';
  source = interval(500);
  viewMode: string;
  // get watchLists(): IWatchListModel[] {
  //   return this._authService.WatchList;
  // }
  buyForm: FormGroup;
  sell: boolean = false;
  buy: boolean = true;
  btnshow: any = 'MARKET';
  buyValue: number = 646.12;
  sellValue: number = 634.12;
  quantityValue: number = 1;
  profitValue: any = this.buyValue + this.buyValue * 0.05;
  lossValue: number = this.buyValue - this.buyValue * 0.03;
  totalOrderValue: number = this.profitValue * this.quantityValue;
  quote: any;
  watchlistName: string = "";
  watchlistError: string = "";
  isWatchlistUpdate: boolean = true;
  buttn: boolean = true;
  equity = 'equity';
  usersAccountBalances: any;

  gridCheck: string = 'profit';
  get symbolName() {
    if (!this.symbol)
      return "";

    const name = this.symbol.description.split("-")[0].trim();
    return `${name} (${this.symbol.symbol})`;
  }

  get price() {
    return this.priceObj?.find(x => x.type === "trade")?.price;
  }

  get change() {
    if (this.priceObj?.find(x => x.type === "summary")?.close) {
      return this.priceObj?.find(x => x.type === "summary")?.close - this.priceObj?.find(x => x.type === "summary")?.prevClose;
    } else {
      return this.priceObj?.find(x => x.type === "trade")?.price - this.priceObj?.find(x => x.type === "summary")?.prevClose;
    }
  }

  get prevClose() {
    return this.priceObj?.find(x => x.type === "summary")?.prevClose;
  }

  get changePercentage() {
    if (this.prevClose === 0)
      return 0;
    return ((this.price - this.prevClose) / this.prevClose) * 100;
  }

  getDisplayValue(value, pipeFormat = '1.2-2') {
    if (!!value || value === 0)
      return this.numberPipe.transform(value, pipeFormat);
    return "-";
  }


  get buyQuantity() {
    return this.buyForm.get('Quantity');
  }

  get exchange() {
    return this.priceObj?.find(x => x.type === "trade")?.exch;
  }

  get buttonClass() {
    return this.buy ? "btn-buy" : "btn-sell";
  }
  constructor(private _truchartsService: TruchartsService, private _authService: AuthService,
    private _stockService: StockService,
    private _userService: UserService,
    private _loginService: LoginService, private _localstorageHelper: LocalstorageHelper,
    private _fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private numberPipe: DecimalPipe,
    private _toastr: ToastrService,
    private http: HttpClient,
    private modalService: BsModalService,
    private permissionsService: PermissionsService
  ) { }

  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  ngOnInit(): void {

    this.viewMode = this._localstorageHelper.getViewModelInitial();
    this._localstorageHelper.getViewMode().subscribe(mode => {
      this.viewMode = mode;
    });
    this.types = [
      { label: 'BUY', value: 'BUY' },
      { label: 'SELL', value: 'SELL' }
    ];

    this.portfolios = [
      { label: 'Test', value: 'Test' },
      { label: 'Test 1', value: 'Test 1' },
      { label: 'Test 2', value: 'Test 2' }
    ];
    //this.loadWatchList();
    this._truchartsService.getWatchList().subscribe(data => {
      this.watchLists = data;
      this.watchLists.reverse();
    });
    this.subscription = this.myWebSocket.subscribe(
      msg => {
        // console.log('pricing', msg);
        switch (msg.type) {
          case 'trade':
            let trade = this.priceObj.find(x => x.type === "trade");
            if (!trade || msg.price != this.price) {
              this.priceObj = this.priceObj.filter(x => x.type !== "trade");
              this.priceObj.push(msg);
              // console.log(this.priceObj);
            }
            break;
          case 'summary':
            let summary = this.priceObj.find(x => x.type === "summary");
            if (!summary || msg.prevClose != this.change) {
              this.priceObj = this.priceObj.filter(x => x.type !== "summary");
              this.priceObj.push(msg);
            }
            break;
        }

        this.calculateBuySellValue();
      },
      // Called whenever there is a message from the server
      err => console.log('error', err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
    );

    this._stockService.getSessionKey().subscribe(data => {
      this.sessionId = data.stream.sessionid;
      //this.myWebSocket.next({ symbols: [this.symbol.symbol], sessionid: this.sessionId, linebreak: true });
      this.source.subscribe(x => {
        this.myWebSocket.next({ symbols: [this.symbol.symbol], sessionid: this.sessionId, linebreak: true });
      });
    });

    this.buyForm = this._fb.group({
      Quantity: ['100', Validators.required],
    });

    this._stockService.getMarketQuotes(this.symbol?.symbol).subscribe((data: any) => {
      this.quote = data.quotes.quote;
    });
  }

  calculateBuySellValue() {
    const price = parseFloat(this.price);

    this.buyValue = parseFloat((price + price * 0.05).toFixed(2));
    this.sellValue = parseFloat((price + price * - 0.05).toFixed(2));
  }

  showPorfolioOverley(event, overlaypanel: OverlayPanel) {
    if (!!overlaypanel)
      overlaypanel.show(event);
  }

  hideOverley(overlaypanel: OverlayPanel) {
    if (!!overlaypanel)
      overlaypanel.hide();
  }

  addToWatchList(name, symbol) {
    this._truchartsService.updateWatchList(name, symbol).subscribe(data => console.log("Watchlist updated!"));
  }

  showLoginForm() {
    this._loginService.showLoginForm();
  }

  reloadPrice() {
    this.priceObj = [];
  }

  // clickedSell() {
  //   this.sell = true;
  //   this.buy = false;
  //   this.profitValue = parseFloat((this.sellValue + (this.sellValue * 0.05)).toFixed(2));
  //   this.lossValue = parseFloat((this.sellValue - (this.sellValue * 0.03)).toFixed(2));
  // }
  // clickedBuy() {
  //   this.buy = true;
  //   this.sell = false;
  //   this.profitValue = parseFloat((this.buyValue + (this.buyValue * 0.05)).toFixed(2));
  //   this.lossValue = parseFloat((this.buyValue - (this.buyValue * 0.03)).toFixed(2));
  //   this.show('MARKET');
  //   this.profitCheck('profit');
  // }

  show(arg = 'MARKET') {
    this.btnshow = arg;
  }

  profitCheck(arg = 'profit') {
    this.gridCheck = arg;
    if (this.gridCheck === 'profit') {
      this.totalOrderValue = this.profitValue * this.quantityValue;
    }
    if (this.gridCheck === 'loss') {
      this.totalOrderValue = this.lossValue * this.quantityValue;
    }

  }
  totalOrder($event) {
    this.quantityValue = $event.target.value;
    if (this.gridCheck === 'profit') {
      this.totalOrderValue = this.profitValue * this.quantityValue;
    }
    if (this.gridCheck === 'loss') {
      this.totalOrderValue = this.lossValue * this.quantityValue;
    }
  }

  gotoTradier() {
    this._stockService.buySell(this.symbol.symbol, this.sell ? "sell" : "buy", this.quantityValue.toString(), this.btnshow, "day")
      .subscribe((data: any) => {

        if (data['order'] && data['order']['status'] == 'ok') {

          this._userService.getAccountBalances().subscribe((data) => {
            this.usersAccountBalances = data;
            console.log(this.usersAccountBalances.balances.total_equity, "Account Balances");
            if (this.sell) {
              let ele: HTMLElement = this.closeBtn.nativeElement;
              ele.click();
              let el: HTMLElement = this.showOrderDetail.nativeElement;
              el.click()
              alert('Sell successful');
            }
            else {
              let ele: HTMLElement = this.closeBtn.nativeElement;
              ele.click();
              let el: HTMLElement = this.showOrderDetail.nativeElement;
              el.click()
              // alert('Buy successful');
            }
          })

          // popup

        }
        else {
          const error = data['errors']['error'][0];
          alert(error);
          let el: HTMLElement = this.closeBtn.nativeElement;
          el.click();
        }

      });
    // window.open("https://brokerage.tradier.com/user/login", "_blank");
    // this.document.location.href = 'https://brokerage.tradier.com/user/login';
  }

  onCreateWatclist() {
    this.watchlistError = "";
    if (this.watchlistName === "") {
      this.watchlistError = "Please enter name for the watchlist";
      return;
    }

    this.isWatchlistUpdate = false;
    this.updateWatchlist(this.watchlistName, this.symbol.symbol);
  }

  onUpdateWatchlist(name) {
    this.isWatchlistUpdate = true;

    this.updateWatchlist(name, this.symbol.symbol);
  }

  updateWatchlist(name: string, ticker: string) {
    this._truchartsService.updateWatchlist(name, ticker).subscribe((data) => {
      if (!this.isWatchlistUpdate) {
        this.isWatchlistUpdate = true;
        this._toastr.info(`${name} Watchlist is created.\n\n${ticker} added to watchlist ${name}`);
      } else {
        this._toastr.info(`${ticker} added to watchlist ${name}`);
      }
      this._truchartsService.getWatchList().subscribe(data => {
        this.watchLists = data;
        this.watchLists.reverse();
        $("#watchlist-modal").modal("hide");
      });
    });
  }

  onBuyClick() {
    const initialState = { symbol: this.symbol.symbol, side: 'buy' };
    this.modalService.show(TraderDetailsComponent, { class: 'modal-xl', initialState });
  }

  onSellClick() {
    const initialState = { symbol: this.symbol.symbol, side: 'sell' };
    this.modalService.show(TraderDetailsComponent, { class: 'modal-xl', initialState });
  }

  hasPermission() {
    this.permissionsService.hasPermission([RoleConst.Administrators, RoleConst.Silver, RoleConst.Gold, RoleConst.Platinum]);
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
}
