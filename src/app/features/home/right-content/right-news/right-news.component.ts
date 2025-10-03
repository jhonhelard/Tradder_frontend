import { Component, OnInit } from '@angular/core';
import { IStockNewsModel } from 'src/app/core/models/stock-news.model';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-right-news',
  templateUrl: './right-news.component.html',
  styleUrls: ['./right-news.component.css']
})
export class RightNewsComponent implements OnInit {
  news: IStockNewsModel[];
  constructor(private _generalService: GeneralService) { }

  ngOnInit(): void {
    
    this._generalService.getStockNews().subscribe(data => {      
      this.news = data.filter((item, idx) => idx < 5).map(x => {
        if (x.Title.length > 120)
          x.Title = x.Title.substr(0, 120) + "...";
        return x;
      });
    });
  }

}
