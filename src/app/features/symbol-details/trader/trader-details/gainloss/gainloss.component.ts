import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TradierService } from 'src/app/core/services/tradier.service';

@Component({
  selector: 'app-gainloss',
  templateUrl: './gainloss.component.html',
  styleUrls: ['./gainloss.component.css']
})
export class GainlossComponent implements OnInit, OnChanges {
  gainloss: any[] = [];
  page: any = 1
  limit: any = 100
  sortBy: any = "closeDate"
  sort: any = 'desc'

  gainLossFilterForm = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    symbol: new FormControl(),
  });

  constructor(private _TradierService: TradierService) { }

  ngOnInit(): void {
    this.getGainLoss(this.page)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getGainLoss(this.page);
  }

  getGainLoss(page) {
    const start = this.gainLossFilterForm.get('start').value ?? '';
    const end = this.gainLossFilterForm.get('end').value ?? '';
    const symbol = this.gainLossFilterForm.get('symbol').value ?? '';

    this._TradierService.getGainLoss(page, this.limit, this.sortBy, this.sort, start, end, symbol).subscribe((data: any) => {
      if (Array.isArray(data.gainloss.closed_position)) {
        this.gainloss = data.gainloss.closed_position;
      }
      else if (data.gainloss.closed_position) {
        this.gainloss = [data.gainloss.closed_position];
      }
    });
  }

  onScroll() {
    this.page++;
    console.log(this.page)
    this.getGainLoss(this.page)
  }
}
