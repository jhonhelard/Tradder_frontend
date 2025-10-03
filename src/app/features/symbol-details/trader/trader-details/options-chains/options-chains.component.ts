import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SideOption } from 'src/app/core/constants/app.const';
import { ITruchartsCompanyModel } from 'src/app/core/models/trucharts-company.model';
import { GeneralService } from 'src/app/core/services/general.service';
import { TradierService } from 'src/app/core/services/tradier.service';

@Component({
  selector: 'app-options-chains',
  templateUrl: './options-chains.component.html',
  styleUrls: ['./options-chains.component.css']
})
export class OptionsChainsComponent {
  @Input() symbol: string;
  @Input() sendToTickets: Function;

  autocomplete: any;
  dates: any[] = [];
  optionChains: any[] = [];
  tickets: any[] = [];
  text: string;
  results: Observable<ITruchartsCompanyModel[]>;
  sideOption: any = SideOption;

  OptionsChains = new FormGroup({
    date: new FormControl(),
    symbol: new FormControl(''),
  });

  constructor(private _generalService: GeneralService, private _TradierService: TradierService, public datepipe: DatePipe) {
    this.OptionsChains.get('symbol').valueChanges.subscribe(symbol => {
      if (symbol) {
        this._TradierService.getOptionsExpiration(symbol.ticker).subscribe((data: any) => {
          if (data.expirations && data.expirations.date) {
            this.dates = data.expirations.date;
            this.OptionsChains.get('date').setValue(this.dates[0]);
            this.onSearchClick();
          }
        });
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.OptionsChains.get("symbol").setValue({ ticker: this.symbol });
  }

  onSearchClick() {
    let latest_date = this.datepipe.transform(this.OptionsChains.value.date, 'yyyy-MM-dd');
    this._TradierService.getOptionsChains(this.OptionsChains.value.symbol.ticker, latest_date).subscribe((data: any) => {
      if (data.options) {
        const options = [];
        const optionPuts = data.options.option.filter(data => data.option_type === "put");
        const optionCalls = data.options.option.filter(data => data.option_type === "call");

        for (let index = 0; index < optionPuts.length; index++) {
          const optionPut = optionPuts[index];
          const optionCall = optionCalls[index];
          for (let key in optionCall) {
            optionPut[key + 'Call'] = optionCall[key];
          }
          options.push({ ...optionPut });
        }
        this.optionChains = options;
      }
    });
  }

  addIntoTickets() {
    const tickets = [];
    this.optionChains.forEach(item => {
      if (item.put && item.put.buy) {
        tickets.push({ side: item.put.buy, symbol: item.symbol, quantity: 1, ...item, option_type: 'put', strike: item.strike });
      }

      if (item.put && item.put.sell) {
        tickets.push({ side: item.put.sell, symbol: item.symbol, quantity: 1, ...item, option_type: 'put', strike: item.strike });
      }

      if (item.call && item.call.buy) {
        tickets.push({ side: item.call.buy, symbol: item.symbolCall, quantity: 1, ...item, option_type: 'call', strike: item.strikeCall });
      }

      if (item.call && item.call.sell) {
        tickets.push({ side: item.call.sell, symbol: item.symbolCall, quantity: 1, ...item, option_type: 'call', strike: item.strikeCall });
      }
    })
    this.tickets = tickets;
  }

  onBuySell(item, callOrPut, side) {

    if (side == SideOption.BuyToOpen) {
      if (item[callOrPut]?.buy == SideOption.BuyToOpen) {
        item[callOrPut] = { ...item[callOrPut], buy: SideOption.BuyToClose };
      } else if (item[callOrPut]?.buy == SideOption.BuyToClose) {
        item[callOrPut] = { ...item[callOrPut], buy: '' };
      } else {
        item[callOrPut] = { ...item[callOrPut], buy: SideOption.BuyToOpen };
      }
    } else {
      if (item[callOrPut]?.sell == SideOption.SellToOpen) {
        item[callOrPut] = { ...item[callOrPut], sell: SideOption.SellToClose };
      } else if (item[callOrPut]?.sell == SideOption.SellToClose) {
        item[callOrPut] = { ...item[callOrPut], sell: '' };
      } else {
        item[callOrPut] = { ...item[callOrPut], sell: SideOption.SellToOpen };
      }
    }
    this.addIntoTickets();
  }

  search(event) {
    if (event.type === 'keyup') return;
    this.results = this._generalService.getSearchCompanies(event.query);
  }

  onKeyUp(event) {
    if (event.key === 'Enter') {
      this.autocomplete.hide();
    }
  }

  onSelect(event) {
    this._TradierService.getOptionsExpiration(event.ticker).subscribe((data: any) => {
      if (data && data.expirations && data.expirations.date) {
        this.dates = data.expirations.date;
        this.OptionsChains.get('date').setValue(this.dates[0]);
        this.onSearchClick();
      }
    });

  }
}
