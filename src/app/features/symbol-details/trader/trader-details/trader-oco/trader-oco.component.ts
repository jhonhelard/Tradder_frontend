import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SideOptions, TypeOptions, DurationOptions, TypeOption, DurationOption } from 'src/app/core/constants/app.const';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';

@Component({
  selector: 'app-trader-oco',
  templateUrl: './trader-oco.component.html',
  styleUrls: ['./trader-oco.component.css']
})
export class TraderOcoComponent implements OnInit {

  @Input() symbol: string;
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

  OcoBuySellForm = new FormGroup({
    class: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    // option_symbol: new FormArray([]),
    // side: new FormArray([]),
    // quantity: new FormArray([]),
    type: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    price: new FormControl(''),
    tag: new FormControl(''),
    array: new FormArray([this.getArrayForm()])
  });
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.OcoBuySellForm.get("symbol").setValue(this.symbol);
    this.OcoBuySellForm.get("class").setValue(this.class);
    this.OcoBuySellForm.get("type").setValue(this.typeOption.Market);
    this.OcoBuySellForm.get("duration").setValue(this.durationOption.Day);
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
  addArrayForm(){
   const formgroup = this.OcoBuySellForm.get('array')as FormArray
  formgroup.push(this.getArrayForm())

  }

  onSubmit() {
    if (this.OcoBuySellForm.valid) {
      console.log(this.OcoBuySellForm.value);
    }
}

}
