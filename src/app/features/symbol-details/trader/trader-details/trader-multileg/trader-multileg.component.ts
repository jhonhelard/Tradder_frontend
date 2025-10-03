import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TypeOptions, DurationOptions, DurationOption, TypeOption, OptionTypeOptions, MultilegSideOptions } from 'src/app/core/constants/app.const';
import { TradierService } from 'src/app/core/services/tradier.service';

@Component({
  selector: 'app-trader-multileg',
  templateUrl: './trader-multileg.component.html',
  styleUrls: ['./trader-multileg.component.css']
})
export class TraderMultilegComponent implements OnInit {
  @Input() symbol: string;
  @Input() class: any;
  @Input() tickets: any[];
  @Input() orderSubmittedCb: Function;

  submitted = false;
  submitInProgress = false;
  sideOptions: any[] = MultilegSideOptions;
  typeOptions: any[] = TypeOptions;
  typeOption: any = TypeOption;
  durationOptions: any[] = DurationOptions;
  optionTypeOptions: any[] = OptionTypeOptions;
  dates: any;
  option_chains: any[] = [];
  strikes: any[] = [];

  multilegBuySellForm = new FormGroup({
    class: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    type: new FormControl(TypeOption.Market, Validators.required),
    duration: new FormControl(DurationOption.Day, Validators.required),
    price: new FormControl(''),
    stop: new FormControl(''),
    tag: new FormControl(''),
    option_symbols: new FormArray([])
  });

  constructor(private _TradierService: TradierService, private toastr: ToastrService) {
    this.multilegBuySellForm.get('symbol').valueChanges.subscribe(symbol => {
      if (symbol) {
        this._TradierService.getOptionsExpiration(symbol.ticker).subscribe((data: any) => {
          if (data.expirations && data.expirations.date) {
            this.dates = data.expirations.date;
          }
        });
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.multilegBuySellForm.get("symbol").setValue(this.symbol);
    this.multilegBuySellForm.get("class").setValue(this.class);
    const formArray = (this.multilegBuySellForm.get('option_symbols') as FormArray)

    if (changes['tickets'].currentValue) {
      const tickets = changes['tickets'].currentValue;

      while (formArray.length) {
        formArray.removeAt(0);
      }

      for (let i = 0; i < tickets.length; i++) {
        let ticket = tickets[i];
        this.strikes[i] = [ticket.strike];
        
        formArray.push(this.getArrayForm({
          expirations_date: ticket.expiration_date,
          striks: ticket.strike,
          option_type: ticket.option_type,
          side: ticket.side,
          quantity: 1
        }))
      }

    }

    if (formArray.length == 0)
      (this.multilegBuySellForm.get('option_symbols') as FormArray).push(this.getArrayForm());

  }

  ngOnInit(): void {
    this.multilegBuySellForm.get('type').valueChanges.subscribe(type => {
      if (type == TypeOption.Market) {
        this.multilegBuySellForm.get('price').setValidators(null);
        this.multilegBuySellForm.get('stop').setValidators(null);

        this.multilegBuySellForm.get('price').setValue(null);
        this.multilegBuySellForm.get('stop').setValue(null);
        
      } else if (type == TypeOption.Limit) {
        this.multilegBuySellForm.get('price').setValidators([Validators.required]);
        this.multilegBuySellForm.get('stop').setValidators(null);
        this.multilegBuySellForm.get('stop').setValue(null);
      }
      else if (type == TypeOption.StopLimit) {
        this.multilegBuySellForm.get('price').setValidators([Validators.required]);
        this.multilegBuySellForm.get('stop').setValidators([Validators.required]);
      }
      else if (type == TypeOption.Stop) {
        this.multilegBuySellForm.get('price').setValidators(null);
        this.multilegBuySellForm.get('stop').setValidators([Validators.required]);
        this.multilegBuySellForm.get('price').setValue(null);
      }

      this.multilegBuySellForm.get('price').updateValueAndValidity();
      this.multilegBuySellForm.get('stop').updateValueAndValidity();
    })
  }

  addRow() {
    (this.multilegBuySellForm.get('option_symbols') as FormArray).push(this.getArrayForm());
  }

  removeRow(i: number) {
    const remove = (this.multilegBuySellForm.get('option_symbols') as FormArray);
    if (remove.length > 1) {
      remove.removeAt(i)
    } else {
      remove.reset()
    }
  }

  getArrayForm(data?: any) {
    const fg = new FormGroup({
      option_symbol: new FormControl(''),
      expirations_date: new FormControl('', Validators.required),
      striks: new FormControl('', Validators.required),
      option_type: new FormControl('', Validators.required),
      side: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });

    const index = (this.multilegBuySellForm.get('option_symbols') as FormArray).length;
    fg.get('expirations_date').valueChanges.subscribe(expirations_date => {
      this._TradierService.getOptionsChains(this.multilegBuySellForm.value.symbol.ticker, expirations_date).subscribe((data: any) => {
        if (data.options && data.options.option) {
          this.option_chains[index] = data.options.option;
          const strikes = data.options.option.map(s => s.strike).filter((value, i, self) => {
            return self.indexOf(value) === i;
          });
          this.strikes[index] = strikes;
        }
      });
    })

    if (data) {
      fg.patchValue(data);
    }

    return fg;
  }

  onSubmit() {
    this.submitted = true;

    if (this.multilegBuySellForm.valid) {
      const option_symbols = this.multilegBuySellForm.value.option_symbols;

      if (option_symbols.length <= 1) {
        this.toastr.warning('Legs must be greator then or equal to 2', 'Warning');
        return;
      }

      option_symbols.forEach((element, index) => {
        const firstElement = this.option_chains[index].find(c => c.strike == element.striks
          && c.option_type == element.option_type
          && c.expiration_date == element.expirations_date);

        if (!element.option_symbol)
          element.option_symbol = firstElement.symbol;
      });

      const newoption_symbols = option_symbols.map(c => {
        return { option_symbol: c.option_symbol, side: c.side, quantity: c.quantity };
      });

      const postData = { ...this.multilegBuySellForm.value, option_symbols: newoption_symbols, symbol: this.multilegBuySellForm.value.symbol.ticker };
      this._TradierService.multilegBuySell(postData).subscribe(_ => {
        this.toastr.success('Multileg Order has been placed successfully', 'Order');
        this.orderSubmittedCb(1);
        this.multilegBuySellForm.reset();
      })
    }
  }

}
