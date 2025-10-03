import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DurationOption, DurationOptions, SideOption, SideOptions, TypeOption, TypeOptions } from 'src/app/core/constants/app.const';
import { ITruchartsCompanyModel } from 'src/app/core/models/trucharts-company.model';
import { GeneralService } from 'src/app/core/services/general.service';
import { TradierService } from 'src/app/core/services/tradier.service';

@Component({
  selector: 'app-trader-equity',
  templateUrl: './trader-equity.component.html',
  styleUrls: ['./trader-equity.component.css']
})
export class TraderEquityComponent implements OnInit {
  @Input() symbol: any;
  @Input() quantity: any;
  @Input() class: any;
  @Input() side: any;
  @Input() type: any;
  @Input() duration: any;
  @Input() orderSubmittedCb: Function;

  submitted = false;
  submitInProgress = false;
  text: string;
  sideOptions: any[] = SideOptions;
  typeOptions: any[] = TypeOptions;
  durationOptions:any[] = DurationOptions;
  typeOption: any = TypeOption;
  durationOption: any = DurationOption;
  sideOption: any = SideOption;

  equityBuySellForm = new FormGroup({
    class: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    side: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    price: new FormControl(''),
    stop: new FormControl(''),
    tag: new FormControl(''),
  });

  constructor(private _TradierService: TradierService, private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.equityBuySellForm.get("symbol").setValue(this.symbol?.ticker);
    this.equityBuySellForm.get("quantity").setValue(this.quantity);
    this.equityBuySellForm.get("class").setValue(this.class);
    this.equityBuySellForm.get("side").setValue(this.sideOption.Buy);
    this.equityBuySellForm.get("type").setValue(this.typeOption.Market);
    this.equityBuySellForm.get("duration").setValue(this.durationOption.Day);
  }

  ngOnInit(): void {
    console.log();
    
  }

  onSubmit() {
    this.submitted = true;
    if (this.equityBuySellForm.invalid) {
      return;
    }
    this.submitInProgress = true;
    this._TradierService.equityBuySell(this.equityBuySellForm.value.symbol, this.equityBuySellForm.value.side, this.equityBuySellForm.value.quantity, this.equityBuySellForm.value.type, this.equityBuySellForm.value.duration, this.equityBuySellForm.value.price, this.equityBuySellForm.value.stop, this.equityBuySellForm.value.tag)
      .subscribe((data: any) => {

        if (data['errors']) {
          this.toastr.error(data['errors']['error'][0], 'Error');
        }

        if (data['order'] && data['order']['status'] == 'ok') {
          if (this.equityBuySellForm.value.side == SideOption.Sell) {
            this.toastr.success('Order placed successfully', 'Sell');
          }
          if (this.equityBuySellForm.value.side == SideOption.Buy) {
            this.toastr.success('Order placed successfully', 'Buy');
          }
          this.equityBuySellForm.get('side').patchValue('buy');
          this.equityBuySellForm.get('quantity').patchValue(null);

          if (this.orderSubmittedCb)
            this.orderSubmittedCb(1);
        }
        this.submitted = false;
        this.submitInProgress = false;
      });
  }
  // onReset() {
  //   if (this.equityBuySellForm.valid) {
  //     console.log("Form reset!");
  //     this.equityBuySellForm.reset();
  //     this.equityBuySellForm.get("symbol").setValue(this.symbol.symbol);
  //   }
  // }
}
