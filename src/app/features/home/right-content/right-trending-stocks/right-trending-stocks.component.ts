import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/core/services/stock.service';
import { ITicketModel } from 'src/app/core/models/ticket.model';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TraderDetailsComponent } from 'src/app/features/symbol-details/trader/trader-details/trader-details.component';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-right-trending-stocks',
  templateUrl: './right-trending-stocks.component.html',
  styleUrls: ['./right-trending-stocks.component.css']
})
export class RightTrendingStocksComponent implements OnInit {
  cols: any[];
  tableData: ITicketModel[];
  selectedItem: any;
  viewMode: string;
  sStartDate: string;
  sEndDate: string;
  html = ``;
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  constructor(private _stockService: StockService, private _localstorageHelper: LocalstorageHelper,private modalService: BsModalService) { }

  ngOnInit() {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(startDate.getDate() - 180);

    this.sStartDate = this.toFormattedDate(startDate);
    this.sEndDate = this.toFormattedDate(endDate);

    this._localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
    this.cols = [
      { field: 'ticker', header: 'Ticker' },
      { field: 'close', header: 'Price' },
      { field: 'volume', header: 'Vol' },
      { field: 'percentChange', header: '%Chg' }
    ];

    this._stockService.getTopActive().subscribe(data => {
      this.tableData = data.map(x => {
        x.changePercent *= 100;
        return x;
      });
    });
  }

  getTooltipHtml(selectedItem) {
    this.html = `<div class="chart-wapper"><div class="chart-loading"><i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i></div>
    <img class="chart-img" src="${this.oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${selectedItem?.ticker}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=${this.sStartDate}&End=${this.sEndDate}&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&HIS=0" width="100%"/></div>`;
  }

  toFormattedDate(date: Date) {
    const day =
      date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
    const tMonth = date.getMonth() + 1;

    const month =
      tMonth ? "0" + tMonth : "" + tMonth;

    return date.getFullYear() + month + day;
  }

  onBuyClick(symbol) {
    const initialState = { symbol, side: 'buy' };
    this.modalService.show(TraderDetailsComponent, { class: 'modal-xl', initialState });
  }

  onSellClick(symbol) {
    const initialState = { symbol, side: 'sell' };
    this.modalService.show(TraderDetailsComponent, { class: 'modal-xl', initialState });
  }
  
  onSymbolSelected(event, rowData) {
    if (event.target.tagName != 'BUTTON') {
      window.location.href = '/stockchart/' + rowData;
    }
  }

}
