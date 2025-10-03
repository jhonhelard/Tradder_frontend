import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { ScreenerData } from 'src/app/core/models/sceenerData.model';
import { environment } from "src/environments/environment";

declare let $: any;


@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.component.html',
  styleUrls: ['./scan-result.component.css']
})
export class ScanResultComponent implements OnInit, AfterContentInit {
  @Input() tableData: ScreenerData[] = [];
  cols: any[];
  selectedItem: any;
  viewMode: string;
  technicals: any[];
  datePipe = new DatePipe('en-US');
  oldwebsiteUrl: string = environment.oldwebsiteUrl;
  frozenCols: any[];
  scrollableCols: any[];

  constructor(
    private localstorageHelper: LocalstorageHelper,
    private router: Router
  ) { }


  ngAfterContentInit(): void {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  }

  ngOnInit() {
    this.localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);
    this.cols = [
      // { field: '', header: '' },
      { field: 'ticker', header: 'Ticker' },
      { field: 'company', header: 'Company Name' },
      { field: 'last', header: 'Last Price' },
      { field: 'open', header: 'Open' },
      { field: 'high', header: 'High' },
      { field: 'low', header: 'Low' },
      { field: 'close', header: 'Close' },
      { field: 'volume', header: 'Volume' },
      { field: 'change', header: 'Change' },
      { field: 'percentChange', header: 'Change %' },
      { field: 'exchange', header: 'Exchange' }
    ];

    this.frozenCols = [
      { field: 'ticker', header: 'Ticker', width: 250 }
  ];
  }

  onSymbolSelected(rowData) {
    // this.router.navigate(['/stockchart/' + rowData.ticker]).then(() => {
    //   window.location.reload();
    // });
    window.open('/stockchart/' + rowData.ticker);
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
              <img class="chart-img" src="${this.oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${selectedItem?.ticker}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=${start}&End=${end}&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&HIS=0" width="100%"/>
            </div>`;
  }
  // showChart = (ticker) => {
  //   console.log(ticker);
  //   const trId = `#row${ticker}`;
  //   const dataOriginalTitle = `<div class="chart-wapper">
  //                               <div class="chart-loading">
  //                                 <i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i>
  //                               </div>    
  //                               <img class="chart-img" src="${oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${ticker}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=20191214&End=20200614&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&x=100&y=100" width="100%"/>
  //                             </div>`;

  //   $(trId).attr('title', '');
  //   $(trId).attr('data-original-title', dataOriginalTitle);
  //   $(trId).attr('aria-describedby', 'tooltip1234567');

  //   // const chart = $('#chart');
  //   this.chartShow = true;
  //   setTimeout( () => { 
  //     const url = `${oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${ticker}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=20191214&End=20200614&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&x=100&y=100`;
  //     // $('#chartImg').attr('src', url);
  //     $('#chartImg').attr('src', '/../../../../assets/dist/img/HEATMAP.png');
  //   }, 3000);    
  // }
  // hideChart(ticker) {
  //   $('#chartImg').attr('src', '');
  //   this.chartShow = false;
  //   const trId = `#row${ticker}`;
  //   $(trId).attr('aria-describedby', null);
  // }
}
