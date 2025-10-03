import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/core/services/stock.service';
import { ITicketModel } from 'src/app/core/models/ticket.model';

@Component({
  selector: 'app-home-top-gainers',
  templateUrl: './home-top-gainers.component.html',
  styleUrls: ['./home-top-gainers.component.css']
})
export class HomeTopGainersComponent implements OnInit {
  idToLoad: string;
  topGainers: ITicketModel[];
  topLoosers: ITicketModel[];
  topActives: ITicketModel[];

  constructor(private _stockService: StockService) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this._stockService.getTopGainer().subscribe(data => this.topGainers = data);
    // }, 500);
    this.idToLoad = '0';

    setTimeout(() => {
      this._stockService.getTopGainer().subscribe(data => {
        this.topGainers = data.map(x => {
          x.changePercent *= 100;
          return x;
        });
      });
    }, 300);

    // setTimeout(() => {
    //   this._stockService.getTopLooser().subscribe(data => this.topLoosers = data);
    // }, 500);
    setTimeout(() => {
      this._stockService.getTopLooser().subscribe(data => {
        this.topLoosers = data.map(x => {
          x.changePercent *= 100;
          return x;
        });
      });
    }, 400);


    // setTimeout(() => {
    //   this._stockService.getTopActive().subscribe(data => this.topActives = data);
    // }, 500);

    setTimeout(() => {
      this._stockService.getTopActive().subscribe(data => {
        this.topActives = data.map(x => {
          x.changePercent *= 100;
          return x;
        });
      });
    }, 500);
  }
}
