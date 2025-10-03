import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

const  oldwebsiteUrl: string = environment.oldwebsiteUrl;

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css']
})
export class TableContentComponent implements OnInit {
  @Input() isBuy: boolean = false;
  technicals: SelectItem[] = [];
  cols: any[];
  tableData: any[];
  selectedItem: any;
  viewMode: string;

  //prescannedResultCols: any[];
  //prescannedResultData: any[];

  constructor(private _localstorageHelper: LocalstorageHelper, private _router: Router) { }

  ngOnInit() {
    this._localstorageHelper.getViewMode().subscribe(mode => this.viewMode = mode);

    this.cols = [
      { field: 'symbol', header: 'Ticker' },
      { field: 'close', header: 'Price' },
      { field: 'vol', header: 'Vol' },
      { field: 'changePercent', header: '%Chg' }
    ];

    this.tableData = [
      { symbol: 'IGC', price: 2.04, vol: 0.72, changePercent: -54.55, companyName: 'Noble Energy, Inc.' },
      { symbol: 'ALRN', price: 2.89, vol: 0.56, changePercent: 20.03, companyName: 'Noble Energy, Inc.' },
      { symbol: 'ARCI', price: 2.89, vol: 0.56, changePercent: 20.03, companyName: 'Noble Energy, Inc.' },
      { symbol: 'WPRT', price: 1.03, vol: 0.72, changePercent: -54.55, companyName: 'Noble Energy, Inc.' },
      { symbol: 'HARI', price: 2.04, vol: 0.72, changePercent: 54.55, companyName: 'Noble Energy, Inc.' },
      // { symbol: 'IPAS', price: 2.04, vol: 0.72, changePercent: 54.55 },
      // { symbol: 'GALT', price: 2.04, vol: 0.72, changePercent: 54.55 },
      // { symbol: 'EOLS', price: 2.04, vol: 0.72, changePercent: 54.55 }
    ]

    // this.prescannedResultCols = [
    //   { field: 'indicator', header: 'Indicators' },
    //   { field: 'result', header: 'Result' },
    // ];

    // this.prescannedResultData = [
    //   { indicator: 'Bullish 13/50 MA Crossover', result: 'Checked' },
    //   { indicator: 'Bullish 50/200 MA Crossover', result: 'Checked' },
    //   { indicator: 'Bullish Engulfing', result: 'Checked' },
    //   { indicator: 'Bullish Harami', result: 'Checked' },
    //   { indicator: 'Bullish MACD Crossovers', result: 'Checked' },
    //   { indicator: 'Gap Ups', result: 'Checked' },
    //   { indicator: 'Improving Chaikin Money Flow', result: 'Checked' }
    // ];

    this.technicals = [
      { label: 'Build 13/50 MA Crossover', value: 1 },
      { label: 'Build 20/50 MA Crossoverk', value: 2 },
      { label: 'Build 25/50 MA Crossoverk', value: 3 },
      { label: 'Build 50/50 MA Crossoverk', value: 4 }
    ];
  }

  getTooltipHtml(selectedItem) {
    return `<div class="chart-wapper"><div class="chart-loading"><i class="fas fa-3x fa-sync-alt fa-spin text-muted"></i></div>    
            <img class="chart-img" src="${oldwebsiteUrl}/Chart.aspx?Provider=DB&Code=${selectedItem?.symbol}&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9)&OVER=MA(13);MA(50)&Skin=${this.viewMode === 'light-mode' ? 'GreenRed' : 'Black'}&Size=520*400&RT=1&Start=20191214&End=20200614&Layout=2LineBlack;DefaultBlack;HisDate&Cycle=DAY1&His=0" width="100%"/></div>`;
  }

  onSymbolSelected(rowData) {
    // this._router.navigate(['/stockchart/' + rowData.symbol]).then(() => {
    //   window.location.reload();
    // });
    window.location.href = '/stockchart/' + rowData.symbol;
  }
}
