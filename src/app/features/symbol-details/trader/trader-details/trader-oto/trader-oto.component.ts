import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SideOptions, TypeOptions, DurationOptions, TypeOption, DurationOption } from 'src/app/core/constants/app.const';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';

@Component({
  selector: 'app-trader-oto',
  templateUrl: './trader-oto.component.html',
  styleUrls: ['./trader-oto.component.css']
})
export class TraderOtoComponent implements OnInit {

  @Input() symbol: ITradierSymbol;
  @Input() quantity: any;
  @Input() class: any;
  @Input() side: any;

  submitted = false;
  submitInProgress = false;
  sideOptions: any[] = SideOptions;
  typeOptions: any[] = TypeOptions;
  durationOptions:any[] = DurationOptions;
  typeOption:any=TypeOption;
  durationOption:any=DurationOption;

  otoBuySellForm = new FormGroup({
    class: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    // option_symbol: new FormArray([], Validators.required),
    // side: new FormArray([], Validators.required),
    // quantity: new FormArray([], Validators.required),
    type: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    price: new FormControl(''),
    stop: new FormControl(''),
    tag: new FormControl(''),
    array: new FormArray([this.getArrayForm()])
  });
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.otoBuySellForm.get("symbol").setValue(this.symbol);
    this.otoBuySellForm.get("class").setValue(this.class);
    this.otoBuySellForm.get("type").setValue(this.typeOption.Market);
    this.otoBuySellForm.get("duration").setValue(this.durationOption.Day);
}

  ngOnInit(): void {
  }
  getArrayForm() {
    const fg = new FormGroup({
      option_symbol: new FormControl(''),
      side: new FormControl('buy'),
      quantity: new FormControl(''),
    });
    return fg;
  }

  onSubmit() {
    if (this.otoBuySellForm.valid) {
      console.log(this.otoBuySellForm.value);
    }
}

}
