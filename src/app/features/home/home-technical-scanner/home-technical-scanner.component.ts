import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-home-technical-scanner',
  templateUrl: './home-technical-scanner.component.html',
  styleUrls: ['./home-technical-scanner.component.css']
})
export class HomeTechnicalScannerComponent implements OnInit {
  technicals: SelectItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.technicals = [
      {label: 'Bearish 13/50 MA Crossover', value: 1},
      {label: 'Bearish 50-200 MA Crossover', value: 1},
      {label: 'Bearish Engulfing', value: 1},
      {label: 'Bearish Harami', value: 1},
      {label: 'Bearish MACD Crossovers', value: 1},
      {label: 'Bullish 13/50 MA Crossover', value: 1},
      {label: 'Bullish 50/200 MA Crossover', value: 1},
      {label: 'Bullish Engulfing', value: 1},
      {label: 'Bullish Harami', value: 1},
      {label: 'Bullish MACD Crossovers', value: 1},
      {label: 'Declining Chaikin Money Flow', value: 1},
      {label: 'Dragonfly Doji', value: 1},
      {label: 'Falling Three Methods', value: 1},
      {label: 'Gap Downs', value: 1},
      {label: 'Gap Ups', value: 1},
      {label: 'Gravestone Doji', value: 1},
      {label: 'Hammer', value: 1},
      {label: 'Improving Chaikin Money Flow', value: 1},
      {label: 'Island Bottoms', value: 1},
      {label: 'Island Tops', value: 1},
      {label: 'Moved Above Upper Bollinger Band', value: 1},
      {label: 'Moved Below Lower Bollinger Band', value: 1},
      {label: 'New 10-Days High', value: 1},
      {label: 'New 10-Days Low', value: 1},
      {label: 'New 20-Days High', value: 1},
      {label: 'New 20-Days Low', value: 1},
      {label: 'New 30-Days High', value: 1},
      {label: 'New 30-Days Low', value: 1},
      {label: 'New 52-week High', value: 1},
      {label: 'New 52-week Low', value: 1},
      {label: 'New CCI Buy Signals', value: 1},
      {label: 'New CCI Sell Signals', value: 1},
      {label: 'Overbought with a Declining RSI', value: 1},
      {label: 'Oversold with an Improving RSI', value: 1},
      {label: 'Parabolic SAR Buy Signals', value: 1},
      {label: 'Parabolic SAR Sell Signals', value: 1},
      {label: 'Piercing Line', value: 1},
      {label: 'Rising Three Methods', value: 1},
      {label: 'RSI less than 30', value: 1},
      {label: 'Stochastic above 80 (OverBought)', value: 1},
      {label: 'Stochastic below 20 (OverSold)', value: 1},
      {label: 'Stocks above 20 Day SMA', value: 1},
      {label: 'Stocks above 50 Day SMA', value: 1},
      {label: 'Stocks below 20 Day SMA', value: 1},
      {label: 'Stocks below 50 Day SMA', value: 1},
      {label: 'Stocks DOWN 10 Day in a row', value: 1},
      {label: 'Stocks DOWN 3 Day in a row', value: 1},
      {label: 'Stocks DOWN 5 Day in a row', value: 1},
      {label: 'Stocks dropping more than $10', value: 1},
      {label: 'Stocks dropping more than $2', value: 1},
      {label: 'Stocks dropping more than $5', value: 1},
      {label: 'Stocks in a New Downtrend (ADX)', value: 1},
      {label: 'Stocks in a New Uptrend (ADX)', value: 1},
      {label: 'Stocks UP 10 Day in a row', value: 1},
      {label: 'Stocks UP 3 Day in a row', value: 1},
      {label: 'Stocks UP 5 Day in a row', value: 1},
      {label: 'Stocks Up by $10', value: 1},
      {label: 'Stocks Up by $2', value: 1},
      {label: 'Stocks Up by $5', value: 1},
      {label: 'Strong Volume Decliners', value: 1},
      {label: 'Strong Volume Gainers', value: 1},
      {label: 'TC Fast Trade Buy Signals', value: 1},
      {label: 'TC Fast Trade Sell Signals', value: 1},
      {label: 'TC Positional Trade Buy Signals', value: 1},
      {label: 'TC Positional Trade Sell Signals', value: 1},
      {label: 'Three Black Crows', value: 1}
    ];
  }

}
