import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/core/services/stock.service';
import { ITruchartsTicketModel } from 'src/app/core/models/trucharts-ticket.model';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-right-recently-viewed',
  templateUrl: './right-recently-viewed.component.html',
  styleUrls: ['./right-recently-viewed.component.css']
})
export class RightRecentlyViewedComponent implements OnInit {
  cols: any[];
  tableData: ITruchartsTicketModel[];
  selectedItem: any;
  viewMode: string;
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  constructor(private _stockService: StockService, private _localstorageHelper: LocalstorageHelper) { }

  ngOnInit() {
    this._localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
    this.cols = [
      { field: 'ticker', header: 'Ticker' },
      { field: 'close', header: 'Price' },
      { field: 'volume', header: 'Vol' },
      { field: 'percentChange', header: 'Chg%' }
    ];

    this._stockService.getRecentlyViewedStocks().subscribe(data => {
      this.tableData = data.map(x => {
        x.changePercent *= 100;
        return x;
      });
    });
  }

  getTooltipHtml(selectedItem) {
    return `<div class="chart-wapper"><div class="chart-loading"><i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i></div>    
            <img class="chart-img" src="${this.oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${selectedItem?.symbol}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=20191214&End=20200614&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&HIS=0" width="100%"/></div>`;
  }
}
