import { Component, OnInit } from '@angular/core';
import { ITicketModel } from 'src/app/core/models/ticket.model';
import { ITradierSymbol } from 'src/app/core/models/tradier-symbol.model';

@Component({
  selector: 'app-buy-symbol',
  templateUrl: './buy-symbol.component.html',
  styleUrls: ['./buy-symbol.component.css']
})
export class BuySymbolComponent implements OnInit {
  symbol: ITradierSymbol
  constructor() { }

  ngOnInit(): void {
  }

  get symbolName() {
    if (!this.symbol)
      return "";

    const name = this.symbol.description.split("-")[0].trim();
    return `${name} (${this.symbol.symbol})`;
  }
}
