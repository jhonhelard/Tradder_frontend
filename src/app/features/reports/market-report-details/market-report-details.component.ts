import { DatePipe } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleConst } from 'src/app/core/constants/app.const';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { AddFavoriteRequest, MarketReportDetailsRequest, MarketReportDetailsResponse } from 'src/app/core/models/report.model';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { ReportService } from 'src/app/core/services/report.service';
import { TruchartsService } from 'src/app/core/services/trucharts.service';
import { environment } from "src/environments/environment";

declare let $: any;

@Component({
  selector: 'app-market-report-details',
  templateUrl: './market-report-details.component.html',
  styleUrls: ['./market-report-details.component.css']
})
export class MarketReportDetailsComponent implements OnInit, AfterContentInit, AfterViewInit {
  datePipe = new DatePipe('en-US');
  viewMode: string;
  Exchange: string = '';
  formula: string = '';
  watchLists: any;
  watchlistName: string = "";
  watchlistError: string = "";
  isWatchlistUpdate: boolean = true;
  TickerName: string = '';
  selectdTicker: string[] = [];
  selectedWatchlistName: string = '';
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  public isLoading: boolean;
  columns: string[] = [];
  filter: MarketReportDetailsRequest = {
    conditionId: [],
    sortBy: 'Date',
    sortDirection: 'desc',
    exchange: '',
    key: '',
    pageIndex: 1,
    pageSize: 25
  };

  public tableData: any[] = [];
  public filteredData: any[] = [];

  searchStringUserName: string = '';
  searchStringEmail: string = '';
  searchStringRole: string = '';
  page: number = 1;
  count: number = 25;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];
  response: MarketReportDetailsResponse = {} as MarketReportDetailsResponse;
  data: any[] = [];
  orderByTemp: string = 'Date'
  sortDirection: string = 'desc'
  defaultLoadData: boolean = false;
  QueryString: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ReportService,
    private localstorageHelper: LocalstorageHelper,
    private permissionsService: PermissionsService,
    private _truchartsService: TruchartsService,
    private _toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
    this.getWathList();
    this.route.queryParams.subscribe(params => {
      const id = params['id'] || '';
      this.QueryString = id;
      if (id == 'Dow30' || id == 'NASDAQ100' || id == 'SAP500') {
        this.formula = id;
        this.GetStockList(id);
      }
      else if (id == 'Basic Materials' || id == 'Conglomerates' || id == 'Consumer Goods'
        || id == 'Consumer Goods' || id == 'Financial' || id == 'Healthcare'
        || id == 'Industrial Goods' || id == 'Consumer Goods' || id == 'Services'
        || id == 'Technology' || id == 'Utilities') {
        this.formula = id;
        this.GetSectorWiseStockList(id);
      }
      else {
        if (id)
          this.filter.conditionId = id.split(',');
        this.GetMarketReportDetails();
      }
    });

  }
  ngAfterViewInit() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    }, 5000);
   
  }

  GetMarketReportDetails() {
    this.isLoading = true;
    this.count = 0;
    this.service.GetMarketReportDetails(this.filter).subscribe(response => {
      this.response = response;
      if (this.response && this.response.Data && this.response.Data.length > 0) {
        this.columns = Object.getOwnPropertyNames(this.response.Data[0]);
        this.data = this.response.Data;
        this.filteredData = this.response.FilterData;
        if (this.filteredData.length > 0) {
          if (this.filter.conditionId.length > 1)
            this.Exchange = 'ALL';
          else
            this.Exchange = this.filteredData[0].Exchange ?? '';
          this.formula = this.filteredData[0].Condition ?? '';
        }
        this.count = this.response.TotalRecord;
        let index = this.columns.indexOf('Exchange');
        if (index > -1) {
          this.columns.splice(index, 1);
          this.columns.push('Exchange');
        }

      }
      this.defaultLoadData = true;
      this.isLoading = false;
    });
  }

  pageChanged(event: any) {
    this.page = event;
    this.filter.pageIndex = event;
    
    if (this.QueryString == 'Dow30' || this.QueryString == 'NASDAQ100' || this.QueryString == 'SAP500') {
      return true;
    } else if (this.QueryString == 'Basic Materials' || this.QueryString == 'Conglomerates' || this.QueryString == 'Consumer Goods'
      || this.QueryString == 'Consumer Goods' || this.QueryString == 'Financial' || this.QueryString == 'Healthcare'
      || this.QueryString == 'Industrial Goods' || this.QueryString == 'Consumer Goods' || this.QueryString == 'Services'
      || this.QueryString == 'Technology' || this.QueryString == 'Utilities') {
      return true;
    }
    this.GetMarketReportDetails();
  }

  orderBy(col: string) {
    if (this.QueryString == 'Dow30' || this.QueryString == 'NASDAQ100' || this.QueryString == 'SAP500') {
      this.isLoading = true;
      this.filter.pageIndex = 1;
      if (this.orderByTemp == col && this.sortDirection == 'asc') {
        this.filter.sortBy = `${col}`;
        this.filter.sortDirection = 'desc';
        this.sortDirection = 'desc';
        this.data.sort((a, b) => (a[col] > b[col]) ? 1 : -1);
      }
      else {
        this.filter.sortBy = `${col}`;
        this.filter.sortDirection = 'asc';
        this.sortDirection = 'asc';
        if (col == 'QuoteCode' || col == 'QuoteName' || col == 'Date' || col == 'Exchange') {
          this.data.sort().reverse();
        } else {
        this.data.sort((a, b) => (b[col] - a[col]));
      }
      }
      this.orderByTemp = col;
      this.isLoading = false;
      return true;
    } else if (this.QueryString == 'Basic Materials' || this.QueryString == 'Conglomerates' || this.QueryString == 'Consumer Goods'
      || this.QueryString == 'Consumer Goods' || this.QueryString == 'Financial' || this.QueryString == 'Healthcare'
      || this.QueryString == 'Industrial Goods' || this.QueryString == 'Consumer Goods' || this.QueryString == 'Services'
      || this.QueryString == 'Technology' || this.QueryString == 'Utilities') {
      this.filter.pageIndex = 1;
      this.isLoading = true;
      if (this.orderByTemp == col && this.sortDirection == 'asc') {
        this.filter.sortBy = `${col}`;
        this.filter.sortDirection = 'desc';
        this.sortDirection = 'desc';
        this.data.sort((a, b) => (a[col] > b[col]) ? 1 : -1);
      }
      else {
        this.filter.sortBy = `${col}`;
        this.filter.sortDirection = 'asc';
        this.sortDirection = 'asc';
        if (col == 'QuoteCode' || col == 'QuoteName' || col == 'Date' || col == 'Exchange') {
          this.data.sort().reverse();
        } else {
        this.data.sort((a, b) => (b[col] - a[col]));
      }
      }
      this.orderByTemp = col;
      this.isLoading = false;
      return true;
    }
    if (col == 'PercentChange')
      col = 'ChangeA';
    this.filter.pageIndex = 1;
    if (this.orderByTemp == col && this.sortDirection == 'asc') {
      this.filter.sortBy = `${col}`;
      this.filter.sortDirection = 'desc';
      this.sortDirection = 'desc';
    }
    else {
      this.filter.sortBy = `${col}`;
      this.filter.sortDirection = 'asc';
      this.sortDirection = 'asc';
    }
    this.orderByTemp = col;
    this.GetMarketReportDetails();
  }

  numberDataFormat(data: any): any {
    if (data) {
      const value = Number(data);
      if (Number.isNaN(value) || value == undefined || value.toString() == 'NaN')
        return data;

      return Number(value).toFixed(2);
    }
    return data;
  }

  GetStockList(reportType: string) {
    this.isLoading = true;
    this.service.GetMarketReportStockList(reportType).subscribe(response => {
      this.data = response;
      this.count = response.length;
      if (response && response.length > 0)
        this.columns = Object.getOwnPropertyNames(this.data[0]);
      this.defaultLoadData = true;
      this.isLoading = false;
    });
  }

  GetSectorWiseStockList(reportType: string) {
    this.isLoading = true;
    this.service.GetSectorWiseStockList(reportType).subscribe(response => {
      this.data = response;
      this.count = response.length;
      if (response && response.length > 0)
        this.columns = Object.getOwnPropertyNames(this.data[0]);
      this.defaultLoadData = true;
      this.isLoading = false;
    });
  }

  getTooltipHtml(selectedItem) {
    let today = new Date();
    const end = this.datePipe.transform(new Date(), 'yyyyMMd');
    const start_date = today.setMonth(today.getMonth() - 6);
    const start = this.datePipe.transform(start_date, 'yyyyMMd');

    return `<div class="chart-wapper">
              <div class="chart-loading">
                <i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i>
              </div>    
              <img class="chart-img" src="${this.oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${selectedItem?.QuoteCode}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=${start}&End=${end}&Layout=2Line;Default;Price;HisDate&Cycle=DAY1&HIS=0" width="100%"/>
            </div>`;
  }

  getWathList() {
    this._truchartsService.getWatchList().subscribe(data => {
      this.watchLists = data;
      this.watchLists.reverse();
    });
  }


  onCreateWatclist() {
    this.watchlistError = "";
    if (this.watchlistName === "") {
      this.watchlistError = "Please enter name for the watchlist";
      return;
    }

    this.isWatchlistUpdate = false;
    this.updateWatchlist(this.watchlistName, this.TickerName);
  }

  addTickerName(TickerName: string) {
    if (this.selectdTicker.findIndex(x => x == TickerName) == -1) {
      this.selectdTicker.push(TickerName);
    } else {
      let i = this.selectdTicker.findIndex(x => x == TickerName);
      this.selectdTicker.splice(i, 1);
    }
  }

  onCheckedTicker(name: string) {
    if (this.selectdTicker.findIndex(x => x == name) > -1) {
      return true;
    }
    return false;
  }

  onSaveFavorites() {

    if (this.selectdTicker.length == 0) {
      this._toastr.info(`please select ticker`);
      return false;
    }

    if (this.selectedWatchlistName == '') {
      this._toastr.info(`please select watchlist`);
      return false;
    }

    let param: AddFavoriteRequest = {
      userName: this.authService.userName,
      tickesNames: this.selectdTicker,
      watchlistId: this.selectedWatchlistName
    }
    this.isLoading = true;
    this.service.AddtoFavorites(param).subscribe((response: string) => {
      if (response) {
        this._toastr.info(response);
      }
      this.isLoading = false;
    });
  }

  onUpdateWatchlist(name: string) {
    this.isWatchlistUpdate = true;
    this.selectedWatchlistName = name;
    // this.updateWatchlist(name, this.TickerName);
  }

  updateWatchlist(name: string, ticker: string) {
    this.TickerName = '';
    if (ticker == '') {
      this._toastr.info(`please select ticker`);
      return false;
    }

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

  hasPermission() {
    this.permissionsService.hasPermission([RoleConst.Administrators, RoleConst.Silver, RoleConst.Gold, RoleConst.Platinum]);
  }

  onSymbolSelected(ticker: any) {
    // this._router.navigate(['/stockchart/' + rowData.symbol]).then(() => {
    //   window.location.reload();
    // });
    window.location.href = '/stockchart/' + ticker;
  }

}
