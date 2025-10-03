import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OverlayPanel } from 'primeng/overlaypanel';
import { RoleConst } from 'src/app/core/constants/app.const';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { ITicketModel } from 'src/app/core/models/ticket.model';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';
import { IWatchListModel } from 'src/app/core/models/watch-list.model';
import { GeneralService } from 'src/app/core/services/general.service';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { StockService } from 'src/app/core/services/stock.service';
import { TruchartsService } from 'src/app/core/services/trucharts.service';
import { TraderDetailsComponent } from '../trader/trader-details/trader-details.component';

@Component({
  selector: 'app-symbol-left-table',
  templateUrl: './symbol-left-table.component.html',
  styleUrls: ['./symbol-left-table.component.css']
})
export class SymbolLeftTableComponent implements OnInit, AfterViewInit {
  @ViewChild('collapse', { static: false }) collapse: ElementRef;
  @Input() symbol: ITradierSymbol;

  tableData: ITicketModel[] = [];
  cols: any[];
  watchLists: IWatchListModel[];

  isTradierLoggedIn: boolean = false;
  isAccordionOpen = false;
  isDefaultAccordionOpen = false;

  selectedWatchList: any;

  constructor(private _truchartsService: TruchartsService, private _stockService: StockService,
    private _router: Router, private localstorageHelper: LocalstorageHelper,
    private modalService: BsModalService, private generalService: GeneralService, private permissionsService: PermissionsService) { }

  ngOnInit(): void {
    this.tableData = [];
    this.isDefaultAccordionOpen = !this.generalService.isMobileView()
    this.cols = [
      { field: 'ticker', header: 'Ticker' },
      { field: 'close', header: 'Price' },
      // { field: 'volume', header: 'Vol' },
      { field: 'percentChange', header: '%Chg' }
      // { field: 'symbol', header: 'Ticker' },
      // { field: 'latestPrice', header: 'Last Price' },
      // { field: 'changePercent', header: '$Chg(%)' },
    ];
    
    const email = localStorage.getItem('app_email');
    if(email){
      this._truchartsService.getWatchList().subscribe(data => {
        this.watchLists = data;
      });
    }
    
    this._stockService.getTopGainer().subscribe(data => {
      data = data.map(x => {
        x.changePercent *= 100;
        return x;
      })
      this.tableData = this.tableData.concat(data)
    });
    this._stockService.getTopActive().subscribe(data => {
      data = data.map(x => {
        x.changePercent *= 100;
        return x;
      })
      this.tableData = this.tableData.concat(data)
    });
    this._stockService.getTopLooser().subscribe(data => {
      data = data.map(x => {
        x.changePercent *= 100;
        return x;
      })
      this.tableData = this.tableData.concat(data)
    });

  }

  ngAfterViewInit(): void {
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    if (width <= 768) {
      this.collapse.nativeElement.dispatchEvent(new MouseEvent('click'));
      console.log(this.collapse);
    }
  }

  changeWatchList(item: IWatchListModel, op) {
    this.tableData = item.stocks.map(x => {
      return <ITicketModel>{
        symbol: x.ticker,
        ticker: x.ticker, // webxtor: duplicate for left-table
        latestPrice: x.close,
        close: x.close, //  webxtor: duplicate for left-table
        changePercent: x.percentChange, //* 100
        percentChange: x.percentChange //  webxtor: duplicate for left-table
      };
    });
    console.log("Watchlist tableData", this.tableData);
    this.selectedWatchList = item.name;
    this.hideChangeOverley(op);
  }

  removeWatchList() {
    this.ngOnInit();
    this.selectedWatchList = "";
  }

  showChangeOverley(event, overlaypanel: OverlayPanel) {

    if (!this.permissionsService.hasPermission([RoleConst.Administrators, RoleConst.Silver, RoleConst.Gold, RoleConst.Platinum])) {
      return false;
    }

    if (!!overlaypanel)
      overlaypanel.show(event);
  }

  hideChangeOverley(overlaypanel: OverlayPanel) {
    if (!!overlaypanel)
      overlaypanel.hide();
  }

  onSymbolSelected(rowData) {
    this._router.navigate(['/stockchart/' + rowData]);
  }

  onBuyClick(symbol) {
    const initialState = { symbol, side: 'buy' };
    this.modalService.show(TraderDetailsComponent, { class: 'modal-xl', initialState });
  }

  onSellClick(symbol) {
    const initialState = { symbol, side: 'sell' };
    this.modalService.show(TraderDetailsComponent, { class: 'modal-xl', initialState });
  }

  openAccordation(event) {
    this.isAccordionOpen = event;
  }

  hasPermission() {
    this.permissionsService.hasPermission([RoleConst.Administrators, RoleConst.Silver, RoleConst.Gold, RoleConst.Platinum]);
  }
}
