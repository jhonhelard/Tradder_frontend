import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SideOptions, TypeOptions, DurationOptions, TypeOption, DurationOption } from 'src/app/core/constants/app.const';

@Component({
  selector: 'app-trader-combo',
  templateUrl: './trader-combo.component.html',
  styleUrls: ['./trader-combo.component.css']
})
export class TraderComboComponent implements OnInit {
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

  comboBuySellForm = new FormGroup({
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
    this.comboBuySellForm.get("symbol").setValue(this.symbol);
    this.comboBuySellForm.get("class").setValue(this.class);
    this.comboBuySellForm.get("type").setValue(this.typeOption.Market);
    this.comboBuySellForm.get("duration").setValue(this.durationOption.Day);
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
  addArrayForm() {
    const formgroup = this.comboBuySellForm.get('array') as FormArray
    formgroup.push(this.getArrayForm())

  }

  onSubmit() {
    if (this.comboBuySellForm.valid) {
      console.log(this.comboBuySellForm.value);
    }
  }

}
