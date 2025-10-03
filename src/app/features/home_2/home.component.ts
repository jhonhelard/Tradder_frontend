import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home2Component implements OnInit {
  technicals: SelectItem[];
  cols: any[];
  tableData: any[];

  prescannedResultCols: any[];
  prescannedResultData: any[];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'ticker', header: 'Ticker' },
      // { field: 'price', header: 'Price' },
      { field: 'close', header: 'Price' },
      { field: 'change', header: 'Change' },
      { field: 'changePercentage', header: 'Change%' }
    ];

    this.tableData = [
      { ticker: 'IGC', price: 2.04, change: 0.72, changePercentage: 54.55 },
      { ticker: 'ALRN', price: 2.89, change: 0.56, changePercentage: 20.03 },
      { ticker: 'ARCI', price: 2.89, change: 0.56, changePercentage: 20.03 },
      { ticker: 'WPRT', price: 1.03, change: 0.72, changePercentage: 54.55 },
      { ticker: 'HARI', price: 2.04, change: 0.72, changePercentage: 54.55 },
      { ticker: 'IPAS', price: 2.04, change: 0.72, changePercentage: 54.55 },
      { ticker: 'GALT', price: 2.04, change: 0.72, changePercentage: 54.55 },
      { ticker: 'EOLS', price: 2.04, change: 0.72, changePercentage: 54.55 }
    ]

    this.prescannedResultCols = [
      { field: 'indicator', header: 'Indicators' },
      { field: 'result', header: 'Result' },
    ];

    this.prescannedResultData = [
      { indicator: 'Bullish 13/50 MA Crossover', result: 'Checked' },
      { indicator: 'Bullish 50/200 MA Crossover', result: 'Checked' },
      { indicator: 'Bullish Engulfing', result: 'Checked' },
      { indicator: 'Bullish Harami', result: 'Checked' },
      { indicator: 'Bullish MACD Crossovers', result: 'Checked' },
      { indicator: 'Gap Ups', result: 'Checked' },
      { indicator: 'Improving Chaikin Money Flow', result: 'Checked' }
    ];

    this.technicals = [
      { label: 'Build 13/50 MA Crossover', value: 1 },
      { label: 'Build 20/50 MA Crossoverk', value: 2 },
      { label: 'Build 25/50 MA Crossoverk', value: 3 },
      { label: 'Build 50/50 MA Crossoverk', value: 4 }
    ];
  }

}
