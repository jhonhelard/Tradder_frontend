import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SideOptions, TypeOptions, DurationOptions, SideOption, DurationOption, TypeOption, OptionTypeOptions, MultilegSideOptions } from 'src/app/core/constants/app.const';
import { TradierService } from 'src/app/core/services/tradier.service';

@Component({
  selector: 'app-trader-option',
  templateUrl: './trader-option.component.html',
  styleUrls: ['./trader-option.component.css']
})
export class TraderOptionComponent implements OnInit {
  @Input() symbol: any;
  @Input() class: any;
  @Input() orderSubmittedCb: Function;

  submitted = false;
  submitInProgress = false;
  sideOptions: any[] = MultilegSideOptions;
  typeOptions: any[] = TypeOptions;
  durationOptions: any[] = DurationOptions;
  sideOption: any = SideOption;
  typeOption: any = TypeOption;
  optionTypeOptions: any[] = OptionTypeOptions;
  durationOption: any = DurationOption;
  strikes: any[] = [];
  dates: any[] = [];
  option_chains: any[] = [];

  optionBuySellForm = new FormGroup({
    class: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    expiration_date: new FormControl('', Validators.required),
    strike: new FormControl('', Validators.required),
    side: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    option_type: new FormControl('', Validators.required),
    type: new FormControl(TypeOption.Market, Validators.required),
    duration: new FormControl(DurationOption.Day, Validators.required),
    price: new FormControl(''),
    stop: new FormControl(''),
    tag: new FormControl(''),
  });
  orderSubmitted = false;
  constructor(private _TradierService: TradierService, private toastr: ToastrService) {
    this.optionBuySellForm.get('symbol').valueChanges.subscribe(symbol => {
      if (symbol) {
        this._TradierService.getOptionsExpiration(symbol.ticker).subscribe((data: any) => {
          if (data.expirations && data.expirations.date) {
            this.dates = data.expirations.date;
          }
        });
      }
    })

    this.optionBuySellForm.get('expiration_date').valueChanges.subscribe(expirations_date => {
      this._TradierService.getOptionsChains(this.optionBuySellForm.value.symbol.ticker, expirations_date).subscribe((data: any) => {
        if (data.options && data.options.option) {
          this.option_chains = data.options.option;
          const strikes = data.options.option.map(s => s.strike).filter((value, i, self) => {
            return self.indexOf(value) === i;
          });
          this.strikes = strikes;
        }
      });
    })

    this.optionBuySellForm.get('type').valueChanges.subscribe(type => {
      if (type == TypeOption.Market) {
        this.optionBuySellForm.get('price').setValidators(null);
        this.optionBuySellForm.get('stop').setValidators(null);

        this.optionBuySellForm.get('price').setValue(null);
        this.optionBuySellForm.get('stop').setValue(null);
        
      } else if (type == TypeOption.Limit) {
        this.optionBuySellForm.get('price').setValidators([Validators.required]);
        this.optionBuySellForm.get('stop').setValidators(null);
        this.optionBuySellForm.get('stop').setValue(null);
      }
      else if (type == TypeOption.StopLimit) {
        this.optionBuySellForm.get('price').setValidators([Validators.required]);
        this.optionBuySellForm.get('stop').setValidators([Validators.required]);
      }
      else if (type == TypeOption.Stop) {
        this.optionBuySellForm.get('price').setValidators(null);
        this.optionBuySellForm.get('stop').setValidators([Validators.required]);
        this.optionBuySellForm.get('price').setValue(null);
      }

      this.optionBuySellForm.get('price').updateValueAndValidity();
      this.optionBuySellForm.get('stop').updateValueAndValidity();
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optionBuySellForm.get("symbol").setValue(this.symbol);
    this.optionBuySellForm.get("class").setValue(this.class);
  }

  ngOnInit(): void {


  }

  onSubmit() {
    this.submitted = true;
    if (this.optionBuySellForm.invalid) {
      return;
    }

    const formValue = this.optionBuySellForm.value;

    let option_symbol = this.option_chains.find(c => c.strike == formValue.strike && c.option_type == formValue.option_type && c.expiration_date == formValue.expiration_date);

    this._TradierService.optionBuySell(this.symbol.ticker,
      this.optionBuySellForm.value.side,
      this.optionBuySellForm.value.quantity,
      this.optionBuySellForm.value.type,
      this.optionBuySellForm.value.duration,
      option_symbol.symbol,
      this.optionBuySellForm.value.price,
      this.optionBuySellForm.value.stop,
      this.optionBuySellForm.value.tag)
      .subscribe((data: any) => {
        if (data['errors']) {
          this.toastr.error(data['errors']['error'][0], 'Error');
        }

        if (data['order'] && data['order']['status'] == 'ok') {
          this.toastr.success('Option Order has been placed successfully', 'Order');
          this.orderSubmittedCb(1);
        }
        this.submitted = false;
        this.submitInProgress = false;
      });
  }

}
