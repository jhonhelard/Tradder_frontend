import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';
import { StockService } from 'src/app/core/services/stock.service';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-symbol-table-content',
  templateUrl: './symbol-table-content.component.html',
  styleUrls: ['./symbol-table-content.component.css']
})
export class SymbolTableContentComponent implements OnInit,OnChanges {
  @Input() symbol: ITradierSymbol;
  marketCapitalization: string;
  eps: string;
  peRatio: string;
  beta: string;
  EBIDTA: string;
// Inside the parent component where you use <app-symbol-right-table>
selectedSymbol: string = 'AAPL'; // Set the default or initial symbol
  tableData: any[];
  cols: any[];
  quote: any;
  dividend: any;
  stableStock: any;
  clock: any;
  change: any;
  price: any;
  priceChangeOpen: any;
  priceChangeClose: any;
  prevClose: any;
  isClockSubscribed: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private http: HttpClient, private _stockservice: StockService, private numberPipe: DecimalPipe, private _generalService: GeneralService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['symbol'] && changes['symbol'].currentValue && !this.isClockSubscribed){
      this._stockservice.getClock().subscribe(data => {
        this.clock = data;
        if (this.clock.clock.state === 'closed') {
          this._stockservice.getCloseStock(this.symbol?.symbol).subscribe((x: any) => {
            if(x && x != null){
              this.price = x?.close;
              this.change = x?.percentChange;
              this.priceChangeOpen = x?.open;
              this.priceChangeClose = x?.close;
              this.prevClose = x?.previousClose;
              this.fetchMarketCapitalization(changes.symbol.currentValue);
            }
          }); 
        } else {
          this._stockservice.getMarketQuotes(this.symbol?.symbol).subscribe((data: any) => {
            this.symbol.close = this.symbol?.last;
            this.fetchMarketCapitalization(changes.symbol.currentValue);
          });
        }
      });
      this.isClockSubscribed=true;
    }

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      const parmId = params.get('id');
      
      if (parmId) {
        this.changeSymbol(parmId);
  
        this._generalService.GetMarketCap(parmId).subscribe(
          data => {
            this.marketCapitalization = data.marketCap;
            this.eps = data.eps;
            this.peRatio=data.peRatio;
            this.beta=data.beta;
            this.EBIDTA = data.EBIDTA;
          },
          error => {
            console.error('Error fetching market cap:', error);
          }
        );
      } else {
        console.warn('Parameter "id" is null or undefined');
      }
    });
  }

changeSymbol(newSymbol: string): void {
  this.selectedSymbol = newSymbol; // Update the selected symbol
}
  reloadTable(symbol: ITradierSymbol) {
    this.symbol = symbol; 

    this._stockservice.getMarketQuotes(this.symbol?.symbol).subscribe((data: any) => {
      this.quote = data.quotes.quote;
    });

    this._stockservice.getDividends(this.symbol?.symbol).subscribe((data: any) => {
      if (!!data && data.length > 0) {
        let i = 1;
        while (i < 5 && (data[0].results[i].tables.valuation_ratios === null || data[0].results[i].tables.valuation_ratios === undefined)) {
          i++;
        }

        this.dividend = data[0].results[i].tables.valuation_ratios ? data[0].results[i].tables : null;
      } else {
        this.dividend = null;
      }
    });

    this._stockservice.getStableStock(this.symbol?.symbol).subscribe(data => {
      this.stableStock = data;
    })
  }

  getDisplayValue(value, pipeFormat = '1.2-2') {
    if (!!value || value === 0)
      return this.numberPipe.transform(value, pipeFormat);
    return "-";
  }

  getPercentageDisplayValue(value, pipeFormat = '1.2-2') {
    if (!!value || value === 0)
      return this.numberPipe.transform(value, pipeFormat) + "%";
    return "-";
  }
  fetchMarketCapitalization(symbol: string) {
    // const apiUrl = `https://trucharts.net/api/proxy/get-market-capitalization?symbol=${symbol}`;
    const apiUrl = `https://trucharts.net/api/proxy/get-marketcap?symbol=${symbol}`;
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        // Parse the market capitalization from the response
        const parsedData = JSON.parse(data);
       // this.marketCapitalization = parsedData.General?.marketCap;
        this.marketCapitalization = data.marketCap.toString();
        this.eps = data.eps.toString();
        this.peRatio=data.peRatio.toString();
      },
      (error) => {
        console.error('Error fetching market capitalization:', error);
      }
    );
  }
  get stock_price() {
    // if (!!this.price)
    //   return this.price;
    return this.quote?.last;
  }

  get stock_high() {
    // if (this.priceChangeClose)
    //   return this.priceChangeClose;
    return this.quote?.low;
  }

  get stock_prevclose() {
    // if (!!this.prevClose)
    //   return this.prevClose;
    return this.quote?.prevclose;
  }

  get stock_low() {
    // if (this.priceChangeOpen)
    //   return this.priceChangeOpen;
    return this.quote?.high;
  }

  get change_percentage() {
    if (!!this.change)
      return this.change;
    return this.quote?.change_percentage;
  }

  getExchangeValue(value) {
    switch (value) {
      case 'A':
        return 'AMEX';
      case 'Q':
        return 'NASDAQ';
      case 'N':
        return 'NYSE ';
      default:
        return '-';
    }
  }
}
