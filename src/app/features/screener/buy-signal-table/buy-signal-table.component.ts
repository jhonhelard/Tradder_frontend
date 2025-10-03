import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-buy-signal-table',
  templateUrl: './buy-signal-table.component.html',
  styleUrls: ['./buy-signal-table.component.css']
})
export class BuySignalTableComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  tableData: any[];
  @Input()
  isScanning: boolean;
  cols: any[];
  selectedItem: any;
  viewMode: string;
  technicals: any[];
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  constructor(
    private localstorageHelper: LocalstorageHelper,
    private router: Router) {
  }

  ngOnInit() {
    this.localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
    this.cols = [
      { field: '', header: '' },
      { field: 'ticker', header: 'Ticker' },
      { field: 'company', header: 'Company Name' },
      { field: 'last', header: 'Last Price' },
      { field: 'open', header: 'Open' },
      { field: 'high', header: 'High' },
      { field: 'low', header: 'Low' },
      { field: 'close', header: 'Close' },
      { field: 'volume', header: 'Volume' },
      { field: 'change', header: 'Change %' },
      { field: 'exchange', header: 'Exchange' },
      { field: 'option', header: 'Option' }
    ];
  }
  onSymbolSelected(rowData) {
    // this.router.navigate(['/stockchart/' + rowData.ticker]).then(() => {
    //   window.location.reload();
    // });
    window.location.href = '/stockchart/' + rowData.ticker;
  }
  getTooltipHtml(selectedItem) {
    return `<div class="chart-wapper">
              <div class="chart-loading">
                <i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i>
              </div>    
              <img class="chart-img" src="${this.oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${selectedItem?.ticker}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=20191214&End=20200614&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&HIS=0" width="100%"/>
            </div>`;
  }
}
